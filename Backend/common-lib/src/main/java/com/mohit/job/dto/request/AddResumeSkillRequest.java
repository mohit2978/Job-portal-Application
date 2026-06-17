package com.mohit.job.dto.request;

import com.mohit.job.domain.ProficiencyLevel;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddResumeSkillRequest {
    @NotBlank(message = "Skill name is required")
    @Size(max = 100)
    private String skillName;

    private ProficiencyLevel proficiencyLevel;

    @Min(0)
    private Integer yearsOfExperience;

    private Integer displayOrder;
}
