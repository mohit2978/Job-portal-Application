package com.mohit.job.dto.response;

import com.mohit.job.domain.CompanySize;
import com.mohit.job.domain.CompanyStatus;
import com.mohit.job.domain.CompanyType;
import com.mohit.job.domain.IndustryType;
import lombok.*;

import java.time.LocalDateTime;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyResponse {
    private Long id;
    private String name;

    private String slug;

    private String tagLine;

    private String description;

    private String email;
    private String phone;

    private String logoUrl;

    private String coverImageUrl;

    private String websiteUrl;

    private Integer foundedYear;

    private CompanySize companySize;

    private CompanyType companyType;

    private IndustryType industryType;

    private Boolean active;
    private CompanyStatus status ;

    private String registrationNumber;

    private Long ownerId;

    private List<SocialLinkResponse> socialLinks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime verifiedAt;
}
