package com.mohit.job.controller;

import com.mohit.job.PayLoad.UpdateUserRequest;
import com.mohit.job.domain.UserRole;
import com.mohit.job.dto.response.UserResponse;
import com.mohit.job.mapper.UserMapper;
import com.mohit.job.modal.User;
import com.mohit.job.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile (
            @RequestHeader("X-User-Email") String email
    ) throws Exception{
        User user=userService.getUserByEmail(email);
        return ResponseEntity.ok(UserMapper.toDTO(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> getProfile (
            @RequestHeader("X-User-Email") String email,
            @RequestBody UpdateUserRequest req
    ) throws Exception{
        return ResponseEntity.ok(userService.updateProfile(email, req));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById (
            @PathVariable Long userId
    )throws Exception{

        User user=userService.getUserById(userId);
        return ResponseEntity.ok(UserMapper.toDTO(user));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() throws Exception {
            return ResponseEntity.ok(UserMapper.toDTO(userService.getAllUsers()));
    }


    // ── Admin actions ──────────────────────────────────────────────────────────

    @PatchMapping("/{userId}/suspend")
    public ResponseEntity<UserResponse> suspendUser(
            @PathVariable Long userId) throws Exception {
        return ResponseEntity.ok(userService.suspendUser(userId));
    }

    @PatchMapping("/{userId}/activate")
    public ResponseEntity<UserResponse> activateUser(
            @PathVariable Long userId) throws Exception {
        return ResponseEntity.ok(userService.activateUser(userId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<UserResponse> deleteUser(
            @PathVariable Long userId) throws Exception {
        return ResponseEntity.ok(userService.deactivateUser(userId));
    }

    @PatchMapping("/{userId}/role")
    public ResponseEntity<UserResponse> changeUserRole(
            @PathVariable Long userId,
            @RequestParam UserRole role) throws Exception {
        return ResponseEntity.ok(userService.changeUserRole(userId, role));
    }

}
