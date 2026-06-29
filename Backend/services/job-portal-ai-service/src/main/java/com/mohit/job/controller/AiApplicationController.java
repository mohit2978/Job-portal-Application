package com.mohit.job.controller;

import com.mohit.job.dto.request.BulkScreeningRequest;
import com.mohit.job.dto.request.CoverLetterRequest;
import com.mohit.job.dto.request.ScreeningScoreRequest;
import com.mohit.job.dto.request.SkillsGapRequest;
import com.mohit.job.dto.response.AiTextResponse;
import com.mohit.job.dto.response.BulkScreeningResponse;
import com.mohit.job.dto.response.ScreeningScoreResponse;
import com.mohit.job.dto.response.SkillsGapResponse;
import com.mohit.job.service.ApplicationAiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai/application")
@RequiredArgsConstructor
public class AiApplicationController {

    private final ApplicationAiService applicationAiService;

    @PostMapping("/cover-letter")
    public ResponseEntity<AiTextResponse> generateCoverLetter(
            @Valid @RequestBody CoverLetterRequest request) {
        return ResponseEntity.ok(applicationAiService.generateCoverLetter(request));
    }

    @PostMapping("/screening-score")
    public ResponseEntity<ScreeningScoreResponse> scoreCandidate(
            @RequestBody ScreeningScoreRequest request) {
        return ResponseEntity.ok(applicationAiService.scoreCandidate(request));
    }

    @PostMapping("/skills-gap")
    public ResponseEntity<SkillsGapResponse> analyzeSkillsGap(
            @Valid @RequestBody SkillsGapRequest request) {
        return ResponseEntity.ok(applicationAiService.analyzeSkillsGap(request));
    }

    @PostMapping("/summarize-notes")
    public ResponseEntity<AiTextResponse> summarizeNotes(
            @RequestBody List<String> notes) {
        return ResponseEntity.ok(applicationAiService.summarizeApplicationNotes(notes));
    }
}
