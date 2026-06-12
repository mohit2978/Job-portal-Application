package com.mohit.job.service;

import com.mohit.job.PayLoad.UpdateUserRequest;
import com.mohit.job.dto.response.UserResponse;
import com.mohit.job.modal.User;

import java.util.List;

public interface UserService {

    User getUserByEmail (String email) throws Exception;

    User getUserById (Long id) throws Exception;

    List<User> getAllUsers() throws Exception;

    UserResponse updateProfile(String email, UpdateUserRequest req) throws Exception;

    // admin actions

    UserResponse suspendUser(Long id) throws Exception;

    UserResponse activateUser(Long id) throws Exception;

    UserResponse deactivateUser(Long id) throws Exception;

}
