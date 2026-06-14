package com.mohit.job.dto.response;

import com.mohit.job.domain.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobSummaryResponse {
    private Long id;
    private String title;
    private Long companyId;
    private String city;
    private String country;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private Boolean salaryDisclosed;
    private JobType jobType;
    private WorkMode workMode;
    private ExperienceLevel experienceLevel;
    private JobStatus status;
    private String categoryName;
    private Set<String> skillNames;
    private Set<String> tagNames;
    private Integer openings;
    private Long applicationCount;
    private LocalDate applicationDeadline;
    private LocalDateTime createdAt;
}
