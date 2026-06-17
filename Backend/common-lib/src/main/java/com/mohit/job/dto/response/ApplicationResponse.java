package com.mohit.job.dto.response;

import com.mohit.job.domain.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {
    private Long id;
    private Long candidateId;
    private Long jobId;
    private Long companyId;
    private Long resumeId;
    private ApplicationStatus status;
    private String coverLetter;
    private String notes;
    private LocalDateTime appliedAt;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
