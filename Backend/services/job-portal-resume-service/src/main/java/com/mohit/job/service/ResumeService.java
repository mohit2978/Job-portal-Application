package com.mohit.job.service;

import com.mohit.job.dto.request.CreateResumeRequest;
import com.mohit.job.dto.request.UpdatePersonalInfoRequest;
import com.mohit.job.dto.request.UpdateResumeRequest;
import com.mohit.job.dto.response.ResumeResponse;
import com.mohit.job.modal.Resume;

import java.util.List;

public interface ResumeService {

    ResumeResponse createResume(Long candidateId, CreateResumeRequest req) throws Exception;

    ResumeResponse getResume(Long resumeId, Long candidateId) throws Exception;

    List<ResumeResponse> getMyResumes(Long candidateId);

    ResumeResponse updateResume(Long resumeId, Long candidateId, UpdateResumeRequest req) throws Exception;

    ResumeResponse updatePersonalInfo(Long resumeId, Long candidateId, UpdatePersonalInfoRequest req) throws Exception;

    ResumeResponse setDefault(Long resumeId, Long candidateId) throws Exception;

    void deleteResume(Long resumeId, Long candidateId) throws Exception;

    Resume getResumeEntityById(Long resumeId) throws Exception;
}
