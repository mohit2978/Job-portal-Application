package com.mohit.job.dto.response;

import com.mohit.job.domain.UserRole;
import com.mohit.job.domain.UserStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String profileImage;
    private UserRole role;
    private UserStatus userStatus;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

}
