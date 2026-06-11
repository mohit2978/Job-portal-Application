package com.mohit.job.PayLoad;

import com.mohit.job.dto.response.UserResponse;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private String title;
    private String message;
    private UserResponse user;
}
