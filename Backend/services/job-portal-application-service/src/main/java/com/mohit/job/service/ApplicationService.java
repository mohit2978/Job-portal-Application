package com.mohit.job.service;

import com.mohit.job.dto.request.CompanyApplicationFilterRequest;
import com.mohit.job.dto.request.CreateApplicationRequest;
import com.mohit.job.dto.request.UpdateApplicationStatusRequest;
import com.mohit.job.dto.request.WithdrawApplicationRequest;
import com.mohit.job.dto.response.ApplicationResponse;
import com.mohit.job.modal.JobApplication;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse createApplication(Long candidateId, CreateApplicationRequest req) throws Exception;

    ApplicationResponse getApplicationById(Long id) throws Exception;

    List<ApplicationResponse> getMyApplications(Long candidateId);

    List<ApplicationResponse> getApplicationsForJob(Long jobId);

    List<ApplicationResponse> getApplicationsForCompany(Long userId, CompanyApplicationFilterRequest filter);

    ApplicationResponse updateStatus(Long applicationId, Long employerId, UpdateApplicationStatusRequest req) throws Exception;

    ApplicationResponse withdraw(Long applicationId, Long candidateId, WithdrawApplicationRequest req) throws Exception;

    ApplicationResponse markAsRead(Long applicationId, Long employerId) throws Exception;

    ApplicationResponse toggleStar(Long applicationId, Long employerId) throws Exception;

    void deleteApplication(Long applicationId, Long candidateId) throws Exception;

    void markScreeningsStaleForJob(Long jobId);

    JobApplication getApplicationEntity(Long id) throws Exception;
}
