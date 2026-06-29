package com.mohit.job.controller;

import com.mohit.job.dto.request.CareerFeedbackRequest;
import com.mohit.job.dto.request.ResumeImprovementRequest;
import com.mohit.job.dto.request.ResumeParseRequest;
import com.mohit.job.dto.request.ResumeSummaryRequest;
import com.mohit.job.dto.request.WorkExperienceBulletRequest;
import com.mohit.job.dto.response.AiTextResponse;
import com.mohit.job.dto.response.ApiResponse;
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
    public ResponseEntity<ApiResponse<AiTextResponse>> generateSummary(
            @RequestBody ResumeSummaryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Professional summary generated",
                resumeAiService.generateProfessionalSummary(request)));
    }

    @PostMapping("/experience-bullets")
    public ResponseEntity<ApiResponse<WorkExperienceBulletsResponse>> generateBullets(
            @Valid @RequestBody WorkExperienceBulletRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Bullet points generated",
                resumeAiService.generateWorkExperienceBullets(request)));
    }

    @PostMapping("/parse")
    public ResponseEntity<ApiResponse<ResumeParseResponse>> parseResume(
            @Valid @RequestBody ResumeParseRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Resume parsed successfully",
                resumeAiService.parseResume(request)));
    }

    @PostMapping("/improvements")
    public ResponseEntity<ApiResponse<ResumeImprovementResponse>> getImprovements(
            @Valid @RequestBody ResumeImprovementRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Resume improvements analyzed",
                resumeAiService.getResumeImprovementTips(request)));
    }

    @PostMapping("/career-feedback")
    public ResponseEntity<ApiResponse<CareerFeedbackResponse>> getCareerFeedback(
            @Valid @RequestBody CareerFeedbackRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Career feedback generated",
                resumeAiService.getCareerFeedback(request)));
    }
}
