package com.mohit.job.service.impl;

import com.mohit.job.domain.AlertFrequency;
import com.mohit.job.dto.response.JobAlertResponse;
import com.mohit.job.dto.request.CreateJobAlertRequest;
import com.mohit.job.dto.request.UpdateJobAlertRequest;
import com.mohit.job.entity.JobAlert;
import com.mohit.job.mapper.PreferenceMapper;
import com.mohit.job.repository.JobAlertRepository;
import com.mohit.job.service.JobAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobAlertServiceImpl implements JobAlertService {

    private final JobAlertRepository alertRepository;

    @Override
    public JobAlertResponse createAlert(Long candidateId, CreateJobAlertRequest req) {
        JobAlert alert = JobAlert.builder()
                .candidateId(candidateId)
                .alertName(req.getAlertName())
                .frequency(req.getFrequency() != null ? req.getFrequency() : AlertFrequency.DAILY)
                .keywords(req.getKeywords())
                .locations(req.getLocations() != null ? req.getLocations() : List.of())
                .jobTypes(req.getJobTypes() != null ? req.getJobTypes() : List.of())
                .workModes(req.getWorkModes() != null ? req.getWorkModes() : List.of())
                .experienceLevels(req.getExperienceLevels() != null ? req.getExperienceLevels() : List.of())
                .industries(req.getIndustries() != null ? req.getIndustries() : List.of())
                .minSalary(req.getMinSalary())
                .salaryCurrency(req.getSalaryCurrency() != null ? req.getSalaryCurrency() : "INR")
                .salaryPeriod(req.getSalaryPeriod())
                .build();

        return PreferenceMapper.toAlertResponse(alertRepository.save(alert));
    }

    @Override
    public JobAlertResponse getAlertById(Long alertId, Long candidateId) throws Exception {
        return PreferenceMapper.toAlertResponse(getAlertEntity(alertId, candidateId));
    }

    @Override
    public List<JobAlertResponse> getMyAlerts(Long candidateId) {
        return alertRepository.findByCandidateIdOrderByCreatedAtDesc(candidateId)
                .stream().map(PreferenceMapper::toAlertResponse).toList();
    }

    @Override
    public JobAlertResponse updateAlert(Long alertId, Long candidateId, UpdateJobAlertRequest req) throws Exception {
        JobAlert alert = getAlertEntity(alertId, candidateId);

        if (req.getAlertName() != null) alert.setAlertName(req.getAlertName());
        if (req.getIsActive() != null) alert.setIsActive(req.getIsActive());
        if (req.getFrequency() != null) alert.setFrequency(req.getFrequency());
        if (req.getKeywords() != null) alert.setKeywords(req.getKeywords());
        if (req.getLocations() != null) alert.setLocations(req.getLocations());
        if (req.getJobTypes() != null) alert.setJobTypes(req.getJobTypes());
        if (req.getWorkModes() != null) alert.setWorkModes(req.getWorkModes());
        if (req.getExperienceLevels() != null) alert.setExperienceLevels(req.getExperienceLevels());
        if (req.getIndustries() != null) alert.setIndustries(req.getIndustries());
        if (req.getMinSalary() != null) alert.setMinSalary(req.getMinSalary());
        if (req.getSalaryCurrency() != null) alert.setSalaryCurrency(req.getSalaryCurrency());
        if (req.getSalaryPeriod() != null) alert.setSalaryPeriod(req.getSalaryPeriod());

        return PreferenceMapper.toAlertResponse(alertRepository.save(alert));
    }

    @Override
    public void deleteAlert(Long alertId, Long candidateId) throws Exception {
        alertRepository.delete(getAlertEntity(alertId, candidateId));
    }

    @Override
    public JobAlertResponse toggleAlert(Long alertId, Long candidateId) throws Exception {
        JobAlert alert = getAlertEntity(alertId, candidateId);
        alert.setIsActive(!alert.getIsActive());
        return PreferenceMapper.toAlertResponse(alertRepository.save(alert));
    }

    private JobAlert getAlertEntity(Long alertId, Long candidateId) throws Exception {
        JobAlert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new Exception("Job alert not found with id: " + alertId));
        if (!alert.getCandidateId().equals(candidateId)) {
            throw new Exception("Job alert not found with id: " + alertId);
        }
        return alert;
    }
}
