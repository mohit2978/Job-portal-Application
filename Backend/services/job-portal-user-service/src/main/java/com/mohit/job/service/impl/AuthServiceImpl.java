package com.mohit.job.service.impl;

import com.mohit.job.PayLoad.AuthResponse;
import com.mohit.job.PayLoad.LoginRequest;
import com.mohit.job.PayLoad.SignUpRequest;
import com.mohit.job.domain.UserRole;
import com.mohit.job.domain.UserStatus;
import com.mohit.job.mapper.UserMapper;
import com.mohit.job.modal.User;
import com.mohit.job.repository.UserRepository;
import com.mohit.job.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public AuthResponse signup(SignUpRequest req) throws Exception {
        if(userRepository.existsByEmail(req.getEmail())){
            throw new Exception("Email Already Regsitered"+req.getEmail());
        }
        if(req.getRole()== UserRole.ROLE_ADMIN){
            throw new Exception("Cannot self regsiter as Admin");
        }
        User user=User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(req.getPassword())
                .role(req.getRole())
                .phone(req.getPhone())
                .userStatus(UserStatus.ACTIVE)
                .lastLogin(LocalDateTime.now())
                .build();
        userRepository.save(user);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setTitle("User Register"+user.getFullName());
        authResponse.setMessage("Successful Register");
        authResponse.setJwt("jwt");
        authResponse.setUser(UserMapper.toDTO(user));
        return authResponse;
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        return null;
    }
}
