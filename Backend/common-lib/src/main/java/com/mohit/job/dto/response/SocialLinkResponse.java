package com.mohit.job.dto.response;

import com.mohit.job.domain.SocialPlatform;
import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialLinkResponse {

    private SocialPlatform platform;

    private String url;
}
