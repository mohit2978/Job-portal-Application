package com.mohit.socialmediabackend.Controller;

import com.mohit.socialmediabackend.Exception.UserException;
import com.mohit.socialmediabackend.Model.User;
import com.mohit.socialmediabackend.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserByIdHandler() throws UserException {
//        User requser = userService.findUserProfileByJwt(jwt);
//        User user=userService.findUserById(id);
//
//        UserProfileDto userDto=UserDtoMapper.reqUserDTO(user,requser);
        User user = new User(
                null, // id (auto-generated)
                "john_doe", // username
                "secret123", // password
                "john@example.com", // email
                "John", // firstName
                "Doe", // lastName
                "9876543210", // mobile
                "https://johndoe.com", // website
                "Software engineer and blogger", // bio
                "Male", // gender
                "https://example.com/profile.jpg", // image
                new HashSet<>(), // follower
                new HashSet<>()  // following
        );
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

}
