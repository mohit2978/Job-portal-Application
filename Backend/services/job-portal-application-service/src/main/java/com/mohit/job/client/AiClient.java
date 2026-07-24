package com.mohit.job.client;

import com.mohit.job.dto.request.ScreeningScoreRequest;
import com.mohit.job.dto.response.ApiResponse;
import com.mohit.job.dto.response.ScreeningScoreResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "job-portal-ai-service")
public interface AiClient {

    @PostMapping("/api/ai/application/screening-score")
    ApiResponse<ScreeningScoreResponse> scoreCandidate(@RequestBody ScreeningScoreRequest request);
}
