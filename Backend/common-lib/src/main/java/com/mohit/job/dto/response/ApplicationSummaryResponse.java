package com.mohit.job.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mohit.job.domain.AiShortlistStatus;
import com.mohit.job.domain.ApplicationSource;
import com.mohit.job.domain.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationSummaryResponse {

    private Long id;
    private Long candidateId;
    private Long jobId;
    private Long companyId;

    private ApplicationStatus status;
    private ApplicationSource source;

    private Boolean isRead;
    private Boolean isStarred;

    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    private Integer aiScore;
    private AiShortlistStatus aiShortlistStatus;
}
