package com.mohit.job.service;

import com.mohit.job.dto.request.AddProjectRequest;
import com.mohit.job.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse addProject(Long resumeId, Long candidateId, AddProjectRequest req) throws Exception;
    List<ProjectResponse> getProjects(Long resumeId) throws Exception;
    ProjectResponse updateProject(Long resumeId, Long projectId, Long candidateId, AddProjectRequest req) throws Exception;
    void deleteProject(Long resumeId, Long projectId, Long candidateId) throws Exception;
}
