package com.mohit.job.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AddAwardRequest {
    @NotBlank(message = "Award title is required")
    @Size(max = 200)
    private String title;

    @Size(max = 150)
    private String issuedBy;

    private LocalDate awardDate;

    @Size(max = 2000)
    private String description;

    private Integer displayOrder;
}
