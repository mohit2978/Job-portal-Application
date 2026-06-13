package com.mohit.job.service;

import com.mohit.job.domain.CompanyStatus;
import com.mohit.job.domain.CompanyType;
import com.mohit.job.domain.IndustryType;
import com.mohit.job.dto.request.CompanyRequest;
import com.mohit.job.dto.response.CompanyResponse;
import com.mohit.job.modal.Company;

import java.util.List;

public interface CompanyService {
    CompanyResponse createCompany(Long ownerId, CompanyRequest req) throws Exception;


    CompanyResponse getCompanyById(Long id) throws Exception;

    CompanyResponse getCompanySummaryById(Long id) throws Exception;

    CompanyResponse getMyCompany(Long ownerId) throws Exception;

    List<CompanyResponse> getAllCompanies(
            CompanyType companyType,
            IndustryType industryType,
            CompanyStatus status);

    CompanyResponse updateCompany(Long companyId, Long ownerId, CompanyRequest req)
            throws Exception;

    CompanyResponse verifyCompany(Long companyId) throws Exception;

    CompanyResponse deactivateCompany(Long companyId) throws Exception;

    void deleteCompany(Long companyId, Long ownerId) throws Exception;

    Company getCompanyEntityById(Long id) throws Exception;
}
