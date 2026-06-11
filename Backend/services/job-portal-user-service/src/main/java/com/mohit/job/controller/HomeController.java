package com.mohit.job.controller;

import com.mohit.job.domain.UserRole;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping
    public String getHome(){
        return "HomeController"+ UserRole.ROLE_ADMIN;
    }
}
