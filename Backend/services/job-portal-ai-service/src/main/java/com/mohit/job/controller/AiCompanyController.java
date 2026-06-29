package com.mohit.job.controller;

import com.mohit.job.dto.request.CompanyDescriptionRequest;
import com.mohit.job.dto.request.CompanyTaglineRequest;
import com.mohit.job.dto.response.AiTextResponse;
import com.mohit.job.dto.response.ApiResponse;
import com.mohit.job.dto.response.CompanyTaglineResponse;
import com.mohit.job.service.CompanyAiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/company")
@RequiredArgsConstructor
public class AiCompanyController {

    private final CompanyAiService companyAiService;

    @PostMapping("/describe")
    public ResponseEntity<ApiResponse<AiTextResponse>> generateCompanyDescription(
            @Valid @RequestBody CompanyDescriptionRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Company description generated",
                companyAiService.generateCompanyDescription(request)));
    }

    @PostMapping("/taglines")
    public ResponseEntity<ApiResponse<CompanyTaglineResponse>> generateTaglines(
            @Valid @RequestBody CompanyTaglineRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Taglines generated",
                companyAiService.generateCompanyTaglines(request)));
    }
}
