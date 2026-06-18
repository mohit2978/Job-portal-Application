package com.mohit.job.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationAttachmentResponse {
    private String fileUrl;
    private String fileName;
    private String fileType;
    private Long fileSizeBytes;
}
