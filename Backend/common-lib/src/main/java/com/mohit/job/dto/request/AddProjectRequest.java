package com.mohit.job.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AddProjectRequest {
    @NotBlank(message = "Project title is required")
    @Size(max = 150)
    private String title;

    @Size(max = 5000)
    private String description;

    private List<String> technologies;
    private String projectUrl;
    private String sourceCodeUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isOngoing;
    private Integer displayOrder;
}
