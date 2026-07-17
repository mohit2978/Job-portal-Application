package com.mohit.job.service.impl;

import com.mohit.job.PayLoad.UpdateUserRequest;
import com.mohit.job.domain.UserRole;
import com.mohit.job.domain.UserStatus;
import com.mohit.job.dto.response.UserResponse;
import com.mohit.job.mapper.UserMapper;
import com.mohit.job.modal.User;
import com.mohit.job.repository.UserRepository;
import com.mohit.job.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("user not found");
        }
        return user;
    }

    @Override
    public User getUserById(Long id) throws Exception {
        return userRepository.findById(id).orElseThrow(
                ()->new Exception("User not found")
        );
    }

    @Override
    public List<User> getAllUsers() throws Exception {
        return userRepository.findAll();
    }

    @Override
    public UserResponse updateProfile(String email, UpdateUserRequest req) throws Exception {
        User user=getUserByEmail(email);
        if(req.getFullName()!=null){
            user.setFullName(req.getFullName());
        }
        if(req.getPhone()!=null){
            user.setPhone(req.getPhone());
        }
        if(req.getProfilePicture()!=null){
            user.setProfileImage(req.getProfilePicture());
        }
        return UserMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserResponse suspendUser(Long id) throws Exception {
        User user=getUserById(id);
        user.setUserStatus(UserStatus.SUSPENDED);
        user.setSuspendAt(LocalDateTime.now());

        return UserMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserResponse activateUser(Long id) throws Exception {
        User user=getUserById(id);
        user.setUserStatus(UserStatus.ACTIVE);
        user.setSuspendAt(null);

        return UserMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserResponse deactivateUser(Long id) throws Exception {
        User user=getUserById(id);
        user.setUserStatus(UserStatus.DELETED);
        user.setDeletedAt(LocalDateTime.now());

        return UserMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserResponse changeUserRole(Long id, UserRole role) throws Exception {
        User user = getUserById(id);
        user.setRole(role);
        return UserMapper.toDTO(userRepository.save(user));
    }
}
