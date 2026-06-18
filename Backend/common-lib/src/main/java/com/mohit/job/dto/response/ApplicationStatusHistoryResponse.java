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
public class ApplicationStatusHistoryResponse {
    private Long id;
    private ApplicationStatus fromStatus;
    private ApplicationStatus toStatus;
    private Long changedByUserId;
    private String note;
    private LocalDateTime changedAt;
}
