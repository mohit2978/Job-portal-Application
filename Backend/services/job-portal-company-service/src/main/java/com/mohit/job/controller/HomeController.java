package com.mohit.job.controller;

import com.mohit.job.domain.UserRole;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home(){
        return "Hello World This is Company Service"+ UserRole.ROLE_EMPLOYER;
    }
}
