package com.mohit.job.service.impl;

import com.mohit.job.PayLoad.AuthResponse;
import com.mohit.job.PayLoad.LoginRequest;
import com.mohit.job.PayLoad.SignUpRequest;
import com.mohit.job.domain.UserRole;
import com.mohit.job.domain.UserStatus;
import com.mohit.job.mapper.UserMapper;
import com.mohit.job.modal.User;
import com.mohit.job.repository.UserRepository;
import com.mohit.job.security.CustomUserDetailsService;
import com.mohit.job.security.JwtProvider;
import com.mohit.job.service.AuthService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final CustomUserDetailsService customUserDetailsService;

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
                .password(passwordEncoder.encode(req.getPassword()))
                .role(req.getRole())
                .phone(req.getPhone())
                .profileImage("")
                .userStatus(UserStatus.ACTIVE)
                .lastLogin(LocalDateTime.now())
                .build();
        User savedUser=userRepository.save(user);

        Authentication authentication=new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt= jwtProvider.generateJwtToken(authentication,savedUser.getId());

        AuthResponse authResponse=new AuthResponse();
        authResponse.setTitle("User Register"+user.getFullName());
        authResponse.setMessage("Successful Register");
        authResponse.setJwt(jwt);
        authResponse.setUser(UserMapper.toDTO(user));
        return authResponse;
    }

    @Override
    public AuthResponse login(LoginRequest req) throws Exception {

        Authentication authentication=authenticate(
                req.getEmail(),req.getPassword()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user=userRepository.findByEmail(req.getEmail());
        String jwt= jwtProvider.generateJwtToken(authentication,user.getId());
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setTitle("Welcome Back"+user.getFullName());
        authResponse.setMessage("Successful Login");
        authResponse.setJwt(jwt);
        authResponse.setUser(UserMapper.toDTO(user));

        return authResponse;
    }

    private Authentication authenticate( String email, String password) throws Exception {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        if(userDetails==null){
            throw new Exception("user not found"+email);
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new Exception("password not match");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
