package com.mohit.job.service;

import com.mohit.job.dto.response.SavedJobResponse;
import com.mohit.job.dto.request.SaveJobRequest;

import java.util.List;

public interface SavedJobService {

    SavedJobResponse saveJob(Long candidateId, SaveJobRequest req) throws Exception;

    void unsaveJob(Long candidateId, Long savedJobId) throws Exception;

    List<SavedJobResponse> getMySavedJobs(Long candidateId);

    boolean isSaved(Long candidateId, Long jobId);
}
