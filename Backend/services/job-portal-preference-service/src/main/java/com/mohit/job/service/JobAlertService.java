package com.mohit.job.service;

import com.mohit.job.dto.response.JobAlertResponse;
import com.mohit.job.dto.request.CreateJobAlertRequest;
import com.mohit.job.dto.request.UpdateJobAlertRequest;

import java.util.List;

public interface JobAlertService {
    JobAlertResponse createAlert(Long candidateId, CreateJobAlertRequest req);
    JobAlertResponse getAlertById(Long alertId, Long candidateId) throws Exception;
    List<JobAlertResponse> getMyAlerts(Long candidateId);
    JobAlertResponse updateAlert(Long alertId, Long candidateId, UpdateJobAlertRequest req) throws Exception;
    void deleteAlert(Long alertId, Long candidateId) throws Exception;
    JobAlertResponse toggleAlert(Long alertId, Long candidateId) throws Exception;
}
