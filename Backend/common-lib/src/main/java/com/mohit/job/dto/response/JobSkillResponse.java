package com.mohit.job.dto.response;

import com.mohit.job.domain.SkillCategory;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobSkillResponse {
    private Long id;
    private String name;
    private String slug;
    private SkillCategory category;
    private Boolean active;
}
