package com.mohit.job.service;

import com.mohit.job.dto.request.JobTagRequest;
import com.mohit.job.dto.response.JobTagResponse;
import com.mohit.job.modal.JobTag;

import java.util.List;
import java.util.Set;

public interface JobTagService {
    JobTagResponse createTag(JobTagRequest req) throws Exception;
    List<JobTagResponse> getAllTags();
    List<JobTagResponse> searchTags(String keyword);
    JobTagResponse getTagById(Long id) throws Exception;
    JobTagResponse updateTag(Long id, JobTagRequest req) throws Exception;
    void deleteTag(Long id) throws Exception;
    Set<JobTag> getTagEntitiesByIds(Set<Long> ids) throws Exception;
}
