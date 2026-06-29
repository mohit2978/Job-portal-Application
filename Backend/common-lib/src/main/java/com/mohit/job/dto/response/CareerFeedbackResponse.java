package com.mohit.job.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CareerFeedbackResponse {

    private int profileStrength;
    private List<String> shortlistingIssues;
    private List<Improvement> improvements;
    private List<JobTarget> targetJobs;
    private String overallSummary;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Improvement {
        private String area;
        private String issue;
        private String action;
        private String priority;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class JobTarget {
        private String jobTitle;
        private String reason;
        private String skillMatch;
    }
}
