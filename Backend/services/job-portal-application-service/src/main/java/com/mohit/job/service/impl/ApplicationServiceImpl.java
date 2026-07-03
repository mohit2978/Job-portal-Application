package com.mohit.job.service.impl;

import com.mohit.job.client.CompanyClient;
import com.mohit.job.client.JobClient;
import com.mohit.job.client.ResumeClient;
import com.mohit.job.client.UserClient;
import com.mohit.job.domain.ApplicationStatus;
import com.mohit.job.event.ApplicationEventPublisher;
import com.mohit.job.dto.request.CompanyApplicationFilterRequest;
import com.mohit.job.dto.request.CreateApplicationRequest;
import com.mohit.job.dto.request.UpdateApplicationStatusRequest;
import com.mohit.job.dto.request.WithdrawApplicationRequest;
import com.mohit.job.dto.response.ApplicationResponse;
import com.mohit.job.dto.response.CompanySummaryResponse;
import com.mohit.job.dto.response.JobResponse;
import com.mohit.job.dto.response.JobSummaryResponse;
import com.mohit.job.dto.response.ResumeResponse;
import com.mohit.job.dto.response.UserResponse;
import com.mohit.job.mapper.ApplicationMapper;
import com.mohit.job.modal.ApplicationNote;
import com.mohit.job.modal.ApplicationScreening;
import com.mohit.job.modal.ApplicationStatusHistory;
import com.mohit.job.modal.JobApplication;
import com.mohit.job.repository.ApplicationNoteRepository;
import com.mohit.job.repository.ApplicationScreeningRepository;
import com.mohit.job.repository.ApplicationSpecification;
import com.mohit.job.repository.ApplicationStatusHistoryRepository;
import com.mohit.job.repository.JobApplicationRepository;
import com.mohit.job.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final ApplicationScreeningRepository screeningRepository;
    private final ApplicationStatusHistoryRepository historyRepository;
    private final ApplicationNoteRepository noteRepository;
    private final JobClient jobClient;
    private final ResumeClient resumeClient;
    private final CompanyClient companyClient;
    private final UserClient userClient;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public ApplicationResponse createApplication(Long candidateId, CreateApplicationRequest req) throws Exception {
        if (applicationRepository.existsByCandidateIdAndJobId(candidateId, req.getJobId())) {
            throw new Exception("You have already applied for this job");
        }

        JobResponse job = jobClient.getJobById(req.getJobId());

        ResumeResponse resume = resumeClient.getResumeById(req.getResumeId(), candidateId);
        if (!resume.getCandidateId().equals(candidateId)) {
            throw new Exception("Resume does not belong to you");
        }

        JobApplication application = ApplicationMapper.toEntity(req, candidateId,
                job.getCompanyId(), job.getEmployerId());
        application = applicationRepository.save(application);

        historyRepository.save(ApplicationStatusHistory.builder()
                .application(application)
                .fromStatus(null)
                .toStatus(ApplicationStatus.PENDING)
                .changedByUserId(candidateId)
                .note("Application submitted")
                .build());
        // Ai screening runs in background no call back needed
        return buildFullResponse(application);
    }

    @Override
    public ApplicationResponse getApplicationById(Long id) throws Exception {
        return buildFullResponse(getApplicationEntity(id));
    }

    @Override
    public List<ApplicationResponse> getMyApplications(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId)
                .stream().map(this::buildFullResponse).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponse> getApplicationsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId)
                .stream().map(this::buildFullResponse).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponse> getApplicationsForCompany(Long userId, CompanyApplicationFilterRequest filter) {
        Long companyId = companyClient.getMyCompany(userId).getId();

        LocalDateTime from = filter.getAppliedFrom() != null ? filter.getAppliedFrom().atStartOfDay() : null;
        LocalDateTime to = filter.getAppliedTo() != null ? filter.getAppliedTo().atTime(LocalTime.MAX) : null;

        Sort sort = buildSort(filter.getSortBy());

        return applicationRepository.findAll(
                ApplicationSpecification.forCompanyWithFilters(
                        companyId,
                        filter.getJobId(),
                        filter.getStatus(),
                        filter.getSource(),
                        filter.getIsRead(),
                        filter.getIsStarred(),
                        from,
                        to,
                        filter.getAiShortlistStatus(),
                        filter.getMinAiScore()
                ), sort).stream()
                .map(this::buildFullResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationResponse updateStatus(Long applicationId, Long employerId, UpdateApplicationStatusRequest req) throws Exception {
        JobApplication application = getApplicationEntity(applicationId);
        assertEmployer(application, employerId);

        if (application.getStatus() == ApplicationStatus.WITHDRAWN) {
            throw new Exception("Cannot update status of a withdrawn application");
        }
        if (application.getStatus() == req.getStatus()) {
            throw new Exception("Application is already in status: " + req.getStatus());
        }

        ApplicationStatus oldStatus = application.getStatus();
        application.setStatus(req.getStatus());
        application = applicationRepository.save(application);

        historyRepository.save(ApplicationStatusHistory.builder()
                .application(application)
                .fromStatus(oldStatus)
                .toStatus(req.getStatus())
                .changedByUserId(employerId)
                .note(req.getNote())
                .build());

        eventPublisher.publishStatusChanged(application, oldStatus, req.getNote());

        return buildFullResponse(application);
    }

    @Override
    public ApplicationResponse withdraw(Long applicationId, Long candidateId, WithdrawApplicationRequest req) throws Exception {
        JobApplication application = getApplicationEntity(applicationId);
        assertCandidate(application, candidateId);

        if (application.getStatus() == ApplicationStatus.WITHDRAWN) {
            throw new Exception("Application is already withdrawn");
        }
        if (application.getStatus() == ApplicationStatus.HIRED) {
            throw new Exception("Cannot withdraw an accepted offer");
        }

        ApplicationStatus oldStatus = application.getStatus();
        application.setStatus(ApplicationStatus.WITHDRAWN);
        application.setWithdrawnAt(LocalDateTime.now());
        application.setWithdrawnReason(req.getReason());
        application = applicationRepository.save(application);

        historyRepository.save(ApplicationStatusHistory.builder()
                .application(application)
                .fromStatus(oldStatus)
                .toStatus(ApplicationStatus.WITHDRAWN)
                .changedByUserId(candidateId)
                .note(req.getReason())
                .build());

        eventPublisher.publishStatusChanged(application, oldStatus, req.getReason());

        return buildFullResponse(application);
    }

    @Override
    public ApplicationResponse markAsRead(Long applicationId, Long employerId) throws Exception {
        JobApplication application = getApplicationEntity(applicationId);
        assertEmployer(application, employerId);
        application.setIsRead(true);
        return buildFullResponse(applicationRepository.save(application));
    }

    @Override
    public ApplicationResponse toggleStar(Long applicationId, Long employerId) throws Exception {
        JobApplication application = getApplicationEntity(applicationId);
        assertEmployer(application, employerId);
        application.setIsStarred(!application.getIsStarred());
        return buildFullResponse(applicationRepository.save(application));
    }

    @Override
    public void deleteApplication(Long applicationId, Long candidateId) throws Exception {
        JobApplication application = getApplicationEntity(applicationId);
        assertCandidate(application, candidateId);
        applicationRepository.delete(application);
    }

    @Override
    public void markScreeningsStaleForJob(Long jobId) {
        List<Long> applicationIds = applicationRepository.findByJobId(jobId)
                .stream().map(JobApplication::getId).collect(Collectors.toList());
        if (applicationIds.isEmpty()) return;
        List<ApplicationScreening> screenings = screeningRepository.findByApplicationIdIn(applicationIds);
        screenings.forEach(s -> s.setIsStale(true));
        screeningRepository.saveAll(screenings);
    }

    @Override
    public JobApplication getApplicationEntity(Long id) throws Exception {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new Exception("Application not found with id: " + id));
    }

    private void assertEmployer(JobApplication application, Long employerId) throws Exception {
        if (!application.getEmployerId().equals(employerId)) {
            throw new Exception("You are not the employer for this application");
        }
    }

    private void assertCandidate(JobApplication application, Long candidateId) throws Exception {
        if (!application.getCandidateId().equals(candidateId)) {
            throw new Exception("You are not the owner of this application");
        }
    }

    private Sort buildSort(String sortBy) {
        if ("AI_SCORE_DESC".equals(sortBy)) {
            return Sort.by(Sort.Order.desc("aiScore").with(Sort.NullHandling.NULLS_LAST));
        } else if ("AI_SCORE_ASC".equals(sortBy)) {
            return Sort.by(Sort.Order.asc("aiScore").with(Sort.NullHandling.NULLS_LAST));
        }
        return Sort.by(Sort.Direction.DESC, "appliedAt");
    }

    private ApplicationResponse buildFullResponse(JobApplication application) {
        List<ApplicationStatusHistory> history =
                historyRepository.findByApplicationIdOrderByChangedAtAsc(application.getId());
        List<ApplicationNote> notes =
                noteRepository.findByApplicationIdOrderByCreatedAtDesc(application.getId());

        JobSummaryResponse job = jobClient.getJobSummaryById(application.getJobId());
        CompanySummaryResponse company = companyClient.getCompanySummaryById(application.getCompanyId());
        UserResponse candidate = userClient.getUserById(application.getCandidateId());

        ApplicationScreening screening =
                screeningRepository.findByApplicationId(application.getId()).orElse(null);

        return ApplicationMapper.toResponse(application, history, notes, job, company, candidate, screening);
    }
}
