package com.mohit.job.dto.request;

import com.mohit.job.domain.ResumeTemplate;
import com.mohit.job.domain.ResumeVisibility;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateResumeRequest {
    @Size(max = 150, message = "Title must not exceed 150 characters")
    private String title;

    private ResumeTemplate template;
    private ResumeVisibility visibility;
    private Boolean isDefault;

    @Size(max = 5000, message = "Summary must not exceed 5000 characters")
    private String summary;
}
