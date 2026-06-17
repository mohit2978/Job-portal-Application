package com.mohit.job.service;

import com.mohit.job.dto.request.AddLanguageRequest;
import com.mohit.job.dto.response.LanguageResponse;

import java.util.List;

public interface LanguageService {
    LanguageResponse addLanguage(Long resumeId, Long candidateId, AddLanguageRequest req) throws Exception;
    List<LanguageResponse> getLanguages(Long resumeId) throws Exception;
    LanguageResponse updateLanguage(Long resumeId, Long languageId, Long candidateId, AddLanguageRequest req) throws Exception;
    void deleteLanguage(Long resumeId, Long languageId, Long candidateId) throws Exception;
}
