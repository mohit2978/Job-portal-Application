package com.mohit.job.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ParseResumeRequest {
    @NotBlank(message = "File URL is required")
    private String fileUrl;

    @NotBlank(message = "File name is required")
    private String fileName;

    @NotBlank(message = "File type is required")
    private String fileType;

    private Long resumeId;
}
