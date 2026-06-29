package com.mohit.job.controller;

import com.mohit.job.dto.request.CompanyDescriptionRequest;
import com.mohit.job.dto.request.CompanyTaglineRequest;
import com.mohit.job.dto.response.AiTextResponse;
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
    public ResponseEntity<AiTextResponse> generateCompanyDescription(
            @Valid @RequestBody CompanyDescriptionRequest request) {
        return ResponseEntity.ok(companyAiService.generateCompanyDescription(request));
    }

    @PostMapping("/taglines")
    public ResponseEntity<CompanyTaglineResponse> generateTaglines(
            @Valid @RequestBody CompanyTaglineRequest request) {
        return ResponseEntity.ok(companyAiService.generateCompanyTaglines(request));
    }
}
