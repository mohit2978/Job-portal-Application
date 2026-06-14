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
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String responsibilities;
    private String benefits;

    private Long companyId;
    private Long employerId;
    private JobCategoryResponse category;
    private Set<JobSkillResponse> skills;
    private Set<JobTagResponse> tags;

    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;

    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String currency;
    private SalaryPeriod salaryPeriod;
    private Boolean salaryNegotiable;
    private Boolean salaryDisclosed;

    private JobType jobType;
    private WorkMode workMode;
    private ExperienceLevel experienceLevel;
    private JobStatus status;

    private Integer openings;
    private LocalDate applicationDeadline;
    private LocalDate expiresAt;
    private Boolean active;

    private Long viewCount;
    private Long applicationCount;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;
    private LocalDateTime closedAt;
}
