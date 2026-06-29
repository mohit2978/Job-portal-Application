package com.mohit.job.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CareerFeedbackRequest {

    @NotBlank(message = "Resume content is required")
    private String resumeContent;

    private String targetJobTitle;
}
