package com.umakant.backend.services;

import com.umakant.backend.dto.AuthDTO;

public interface AuthService {
    AuthDTO.AuthResponse signup(AuthDTO.SignupRequest request);
    AuthDTO.AuthResponse login(AuthDTO.LoginRequest request);
}
