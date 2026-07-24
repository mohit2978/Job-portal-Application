package com.mohit.job.service;

import com.mohit.job.client.AiClient;
import com.mohit.job.client.JobClient;
import com.mohit.job.client.ResumeClient;
import com.mohit.job.domain.AiShortlistStatus;
import com.mohit.job.dto.request.ScreeningScoreRequest;
import com.mohit.job.dto.response.JobSummaryResponse;
import com.mohit.job.dto.response.ResumeResponse;
import com.mohit.job.dto.response.ScreeningScoreResponse;
import com.mohit.job.modal.ApplicationScreening;
import com.mohit.job.modal.JobApplication;
import com.mohit.job.repository.ApplicationScreeningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncScreeningService {

    private final AiClient aiClient;
    private final JobClient jobClient;
    private final ResumeClient resumeClient;
    private final ApplicationScreeningRepository screeningRepository;

    /**
     * Runs automatically in a background thread right after a candidate submits
     * an application. Fetches job + resume data, calls the AI service to score
     * the candidate, and persists the result in application_screenings.
     *
     * The candidate's submit request returns IMMEDIATELY — this never blocks it.
     */
    @Async
    public void runScreeningAsync(JobApplication application) {
        Long applicationId = application.getId();
        log.info("[AI Screening] Starting background screening for application {}", applicationId);

        try {
            // 1. Fetch job summary from job-service via Feign
            JobSummaryResponse job = jobClient.getJobSummaryById(application.getJobId());

            // 2. Fetch resume from resume-service via Feign
            ResumeResponse resume = resumeClient.getResumeById(
                    application.getResumeId(), application.getCandidateId());

            // 3. Build the screening request for the AI service
            ScreeningScoreRequest scoreReq = new ScreeningScoreRequest();
            scoreReq.setJobTitle(job.getTitle());
            scoreReq.setExperienceLevel(
                    job.getExperienceLevel() != null ? job.getExperienceLevel().toString() : "Any");
            scoreReq.setRequiredSkills(
                    job.getSkillNames() != null ? List.copyOf(job.getSkillNames()) : null);

            scoreReq.setCandidateSummary(resume.getSummary());
            scoreReq.setCandidateSkills(
                    resume.getSkills() != null
                            ? resume.getSkills().stream()
                                    .map(s -> s.getSkillName())
                                    .collect(Collectors.toList())
                            : null);

            List<String> expList = resume.getWorkExperiences() != null
                    ? resume.getWorkExperiences().stream()
                            .map(e -> e.getJobTitle() + " at " + e.getCompanyName()
                                    + (e.getDescription() != null ? ": " + e.getDescription() : ""))
                            .collect(Collectors.toList())
                    : null;
            scoreReq.setCandidateExperience(expList);

            List<String> eduList = resume.getEducations() != null
                    ? resume.getEducations().stream()
                            .map(e -> e.getDegree()
                                    + (e.getFieldOfStudy() != null ? " in " + e.getFieldOfStudy() : "")
                                    + (e.getInstitutionName() != null ? " from " + e.getInstitutionName() : ""))
                            .collect(Collectors.toList())
                    : null;
            scoreReq.setCandidateEducation(eduList);

            // 4. Call AI service
            ScreeningScoreResponse aiResult = aiClient.scoreCandidate(scoreReq).getData();

            // 5. Determine shortlist status from score
            AiShortlistStatus shortlistStatus;
            if (aiResult.getScore() >= 75) {
                shortlistStatus = AiShortlistStatus.AUTO_SHORTLISTED;
            } else if (aiResult.getScore() >= 50) {
                shortlistStatus = AiShortlistStatus.REVIEW_RECOMMENDED;
            } else {
                shortlistStatus = AiShortlistStatus.LOW_MATCH;
            }

            // 6. Save screening result
            ApplicationScreening screening = screeningRepository
                    .findByApplicationId(applicationId)
                    .orElse(new ApplicationScreening());

            screening.setApplicationId(applicationId);
            screening.setOverallScore(aiResult.getScore());
            screening.setSkillsMatchScore(aiResult.getSkillsMatchScore());
            screening.setExperienceMatchScore(aiResult.getExperienceMatchScore());
            screening.setEducationMatchScore(aiResult.getEducationMatchScore());
            screening.setShortlistStatus(shortlistStatus);
            screening.setSummary(aiResult.getSummary());
            screening.setMatchedSkills(aiResult.getMatchedSkills());
            screening.setMissingSkills(aiResult.getMissingSkills());
            screening.setStrengths(aiResult.getStrengths());
            screening.setConcerns(aiResult.getConcerns());
            screening.setIsStale(false);

            screeningRepository.save(screening);

            log.info("[AI Screening] Completed for application {} — score: {}, status: {}",
                    applicationId, aiResult.getScore(), shortlistStatus);

        } catch (Exception e) {
            // Never let a screening failure crash the thread — just log it
            log.error("[AI Screening] Failed for application {}: {}", applicationId, e.getMessage(), e);
        }
    }
}
