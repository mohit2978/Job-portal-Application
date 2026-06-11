package com.mohit.job.mapper;

import com.mohit.job.dto.response.UserResponse;
import com.mohit.job.modal.User;

public class UserMapper {

    public static UserResponse toDTO(User user){
        UserResponse userResponse=new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhone());
        userResponse.setProfileImage(user.getProfileImage());
        userResponse.setRole(user.getRole());
        userResponse.setUserStatus(user.getUserStatus());
        userResponse.setLastLogin(user.getLastLogin());
        userResponse.setCreatedAt(user.getCreatedAt());
        return userResponse;
    }
}
