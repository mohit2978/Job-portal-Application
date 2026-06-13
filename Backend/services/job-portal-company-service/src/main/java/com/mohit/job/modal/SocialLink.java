package com.mohit.job.modal;

import com.mohit.job.domain.SocialPlatform;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialLink {

    @Enumerated(EnumType.STRING)
    private SocialPlatform platform;

    private String url;
}
