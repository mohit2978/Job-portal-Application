package com.mohit.job.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateApplicationRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    @NotNull(message = "Resume ID is required")
    private Long resumeId;

    private String coverLetter;
}
