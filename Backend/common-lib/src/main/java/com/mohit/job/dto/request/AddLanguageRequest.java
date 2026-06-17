package com.mohit.job.dto.request;

import com.mohit.job.domain.LanguageProficiency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddLanguageRequest {
    @NotBlank(message = "Language name is required")
    @Size(max = 80)
    private String languageName;

    @NotNull(message = "Proficiency is required")
    private LanguageProficiency proficiency;

    private Integer displayOrder;
}
