package com.mohit.job.dto.response;

import com.mohit.job.domain.ParseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeParseJobResponse {
    private Long id;
    private Long candidateId;
    private Long resumeId;
    private String originalFileName;
    private String fileType;
    private ParseStatus status;
    private String parsedData;
    private String failureReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
