package com.mohit.job.controller;

import com.mohit.job.dto.request.HiringInsightsRequest;
import com.mohit.job.dto.request.JobDescriptionRequest;
import com.mohit.job.dto.request.SalaryRangeRequest;
import com.mohit.job.dto.response.AiTextResponse;
import com.mohit.job.dto.response.HiringInsightsResponse;
import com.mohit.job.dto.response.SalaryRangeResponse;
import com.mohit.job.service.JobAiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/job")
@RequiredArgsConstructor
public class AiJobController {

    private final JobAiService jobAiService;

    @PostMapping("/describe")
    public ResponseEntity<AiTextResponse> generateJobDescription(
            @Valid @RequestBody JobDescriptionRequest request) {
        return ResponseEntity.ok(jobAiService.generateJobDescription(request));
    }

    @GetMapping("/requirements")
    public ResponseEntity<AiTextResponse> generateJobRequirements(
            @RequestParam String title,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(jobAiService.generateJobRequirements(title, category));
    }

    @PostMapping("/salary-suggestion")
    public ResponseEntity<SalaryRangeResponse> suggestSalary(
            @Valid @RequestBody SalaryRangeRequest request) {
        return ResponseEntity.ok(jobAiService.suggestSalaryRange(request));
    }

    @GetMapping("/skills-recommendation")
    public ResponseEntity<AiTextResponse> recommendSkills(
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        return ResponseEntity.ok(jobAiService.recommendSkillsForJob(title, description));
    }

    @GetMapping("/responsibilities")
    public ResponseEntity<AiTextResponse> generateResponsibilities(
            @RequestParam String title,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(jobAiService.generateJobResponsibilities(title, category));
    }

    @GetMapping("/benefits")
    public ResponseEntity<AiTextResponse> generateBenefits(
            @RequestParam String title,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String jobType) {
        return ResponseEntity.ok(jobAiService.generateJobBenefits(title, category, jobType));
    }

    @GetMapping("/tags-recommendation")
    public ResponseEntity<AiTextResponse> recommendTags(
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        return ResponseEntity.ok(jobAiService.recommendTagsForJob(title, description));
    }
}
