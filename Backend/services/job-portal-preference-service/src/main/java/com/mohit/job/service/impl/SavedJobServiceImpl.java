package com.mohit.job.service.impl;

import com.mohit.job.dto.response.SavedJobResponse;
import com.mohit.job.dto.request.SaveJobRequest;
import com.mohit.job.entity.SavedJob;
import com.mohit.job.mapper.PreferenceMapper;
import com.mohit.job.repository.SavedJobRepository;
import com.mohit.job.service.SavedJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedJobServiceImpl implements SavedJobService {

    private final SavedJobRepository savedJobRepository;

    @Override
    public SavedJobResponse saveJob(Long candidateId, SaveJobRequest req) throws Exception {
        if (savedJobRepository.existsByCandidateIdAndJobId(candidateId, req.getJobId())) {
            throw new Exception("Job is already saved");
        }
        SavedJob savedJob = SavedJob.builder()
                .candidateId(candidateId)
                .jobId(req.getJobId())
                .companyId(req.getCompanyId())
                .notes(req.getNotes())
                .build();
        return PreferenceMapper.toSavedJobResponse(savedJobRepository.save(savedJob));
    }

    @Override
    public void unsaveJob(Long candidateId, Long savedJobId) throws Exception {
        SavedJob savedJob = savedJobRepository.findById(savedJobId)
                .orElseThrow(() -> new Exception("Saved job not found with id: " + savedJobId));
        if (!savedJob.getCandidateId().equals(candidateId)) {
            throw new Exception("Saved job not found with id: " + savedJobId);
        }
        savedJobRepository.delete(savedJob);
    }

    @Override
    public List<SavedJobResponse> getMySavedJobs(Long candidateId) {
        return savedJobRepository.findByCandidateIdOrderBySavedAtDesc(candidateId)
                .stream().map(PreferenceMapper::toSavedJobResponse).toList();
    }

    @Override
    public boolean isSaved(Long candidateId, Long jobId) {
        return savedJobRepository.existsByCandidateIdAndJobId(candidateId, jobId);
    }
}
