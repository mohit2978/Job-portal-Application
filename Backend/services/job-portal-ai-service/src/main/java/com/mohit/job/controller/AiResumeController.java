package com.mohit.job.controller;

import com.mohit.job.dto.request.CareerFeedbackRequest;
import com.mohit.job.dto.request.ResumeImprovementRequest;
import com.mohit.job.dto.request.ResumeParseRequest;
import com.mohit.job.dto.request.ResumeSummaryRequest;
import com.mohit.job.dto.request.WorkExperienceBulletRequest;
import com.mohit.job.dto.response.AiTextResponse;
import com.mohit.job.dto.response.CareerFeedbackResponse;
import com.mohit.job.dto.response.ResumeImprovementResponse;
import com.mohit.job.dto.response.ResumeParseResponse;
import com.mohit.job.dto.response.WorkExperienceBulletsResponse;
import com.mohit.job.service.ResumeAiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/resume")
@RequiredArgsConstructor
public class AiResumeController {

    private final ResumeAiService resumeAiService;

    @PostMapping("/summary")
    public ResponseEntity<AiTextResponse> generateSummary(
            @RequestBody ResumeSummaryRequest request) {
        return ResponseEntity.ok(resumeAiService.generateProfessionalSummary(request));
    }

    @PostMapping("/experience-bullets")
    public ResponseEntity<WorkExperienceBulletsResponse> generateBullets(
            @Valid @RequestBody WorkExperienceBulletRequest request) {
        return ResponseEntity.ok(resumeAiService.generateWorkExperienceBullets(request));
    }

    @PostMapping("/parse")
    public ResponseEntity<ResumeParseResponse> parseResume(
            @Valid @RequestBody ResumeParseRequest request) {
        return ResponseEntity.ok(resumeAiService.parseResume(request));
    }

    @PostMapping("/improvements")
    public ResponseEntity<ResumeImprovementResponse> getImprovements(
            @Valid @RequestBody ResumeImprovementRequest request) {
        return ResponseEntity.ok(resumeAiService.getResumeImprovementTips(request));
    }

    @PostMapping("/career-feedback")
    public ResponseEntity<CareerFeedbackResponse> getCareerFeedback(
            @Valid @RequestBody CareerFeedbackRequest request) {
        return ResponseEntity.ok(resumeAiService.getCareerFeedback(request));
    }
}
