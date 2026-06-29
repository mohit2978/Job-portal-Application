package com.mohit.job;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableFeignClients
public class JobPortalAiServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalAiServiceApplication.class, args);
    }

}
