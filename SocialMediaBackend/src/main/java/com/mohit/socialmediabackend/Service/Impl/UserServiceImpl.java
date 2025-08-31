package com.mohit.socialmediabackend.Service.Impl;

import com.mohit.socialmediabackend.Exception.UserException;
import com.mohit.socialmediabackend.Model.User;
import com.mohit.socialmediabackend.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        return null;
    }

    @Override
    public User registerUser(User user) throws UserException {
        return null;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        return null;
    }

    @Override
    public User findUserByEmail(String email) throws UserException {
        return null;
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        return "";
    }

    @Override
    public List<User> findUsersByUserIds(List<Integer> userIds) {
        return List.of();
    }

    @Override
    public Set<User> searchUser(String query) throws UserException {
        return Set.of();
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
        return null;
    }

    @Override
    public void updatePassword(User user, String newPassword) {

    }

    @Override
    public void sendPasswordResetEmail(User user) {

    }
}
