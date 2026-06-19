package com.mohit.job.service;

import com.mohit.job.dto.response.JobPreferenceResponse;
import com.mohit.job.dto.request.UpdateJobPreferenceRequest;

public interface JobPreferenceService {
    JobPreferenceResponse getOrCreatePreference(Long candidateId);
    JobPreferenceResponse updatePreference(Long candidateId, UpdateJobPreferenceRequest req);
}
