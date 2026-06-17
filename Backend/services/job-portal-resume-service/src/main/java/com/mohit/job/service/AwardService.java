package com.mohit.job.service;

import com.mohit.job.dto.request.AddAwardRequest;
import com.mohit.job.dto.response.AwardResponse;

import java.util.List;

public interface AwardService {
    AwardResponse addAward(Long resumeId, Long candidateId, AddAwardRequest req) throws Exception;
    List<AwardResponse> getAwards(Long resumeId) throws Exception;
    AwardResponse updateAward(Long resumeId, Long awardId, Long candidateId, AddAwardRequest req) throws Exception;
    void deleteAward(Long resumeId, Long awardId, Long candidateId) throws Exception;
}
