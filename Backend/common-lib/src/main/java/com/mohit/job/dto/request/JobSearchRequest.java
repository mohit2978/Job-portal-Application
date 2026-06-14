package com.mohit.job.dto.request;

import com.mohit.job.domain.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class JobSearchRequest {
    private String keyword;
    private Long categoryId;
    private Set<Long> skillIds;
    private Set<Long> tagIds;
    private Long companyId;

    // Location filter
    private String city;
    private String state;
    private String country;

    // Salary filter
    private BigDecimal minSalary;
    private BigDecimal maxSalary;

    private JobType jobType;
    private WorkMode workMode;
    private ExperienceLevel experienceLevel;
    private JobStatus status;

    private Integer minOpenings;
    private Integer maxOpenings;
}
