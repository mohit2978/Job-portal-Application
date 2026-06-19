package com.mohit.job;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class JobPortalDiscoveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalDiscoveryApplication.class, args);
    }

}
