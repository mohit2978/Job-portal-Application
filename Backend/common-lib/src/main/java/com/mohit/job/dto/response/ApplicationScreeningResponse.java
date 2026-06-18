package com.mohit.job.dto.response;

import com.mohit.job.domain.AiShortlistStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationScreeningResponse {
    private Long id;
    private Integer overallScore;
    private Integer skillsMatchScore;
    private Integer experienceMatchScore;
    private Integer educationMatchScore;
    private AiShortlistStatus shortlistStatus;
    private String summary;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> strengths;
    private List<String> concerns;
    private Boolean isStale;
    private LocalDateTime screenedAt;
    private String screeningVersion;
}
