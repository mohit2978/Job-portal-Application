package com.mohit.job.dto.request;

import com.mohit.job.domain.SkillCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JobSkillRequest {

    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name must not exceed 100 characters")
    private String name;

    @NotNull(message = "Skill category is required")
    private SkillCategory category;
}
