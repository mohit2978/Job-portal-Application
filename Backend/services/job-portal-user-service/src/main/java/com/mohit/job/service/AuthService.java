package com.mohit.job.service;

import com.mohit.job.PayLoad.AuthResponse;
import com.mohit.job.PayLoad.LoginRequest;
import com.mohit.job.PayLoad.SignUpRequest;

public interface AuthService {

    AuthResponse signup (SignUpRequest req) throws Exception;
    AuthResponse login (LoginRequest req) throws Exception;

}
