package com.mohit.job.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mohit.job.domain.ApplicationSource;
import com.mohit.job.domain.ApplicationStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationResponse {

    private Long id;
    private UserResponse candidate;
    private Long employerId;

    private JobSummaryResponse job;
    private CompanySummaryResponse company;

    private ApplicationStatus status;

    private Long resumeId;
    private String coverLetter;

    private BigDecimal expectedSalary;
    private LocalDate availableFrom;

    private Boolean isRead;
    private Boolean isStarred;

    private List<ApplicationStatusHistoryResponse> statusHistory;
    private List<InterviewResponse> interviews;
    private List<ApplicationNoteResponse> notes;

    private LocalDateTime withdrawnAt;
    private String withdrawnReason;

    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    private ApplicationScreeningResponse screening;
}
