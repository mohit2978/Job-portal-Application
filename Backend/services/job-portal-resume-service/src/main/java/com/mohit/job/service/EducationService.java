package com.mohit.job.service;

import com.mohit.job.dto.request.AddEducationRequest;
import com.mohit.job.dto.response.EducationResponse;

import java.util.List;

public interface EducationService {

    EducationResponse addEducation(Long resumeId, Long candidateId, AddEducationRequest req) throws Exception;

    List<EducationResponse> getEducations(Long resumeId) throws Exception;

    EducationResponse updateEducation(Long resumeId, Long educationId, Long candidateId, AddEducationRequest req) throws Exception;

    void deleteEducation(Long resumeId, Long educationId, Long candidateId) throws Exception;
}
