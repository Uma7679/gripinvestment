package com.umakant.backend.services.impl;

import com.umakant.backend.dto.AuthDTO;
import com.umakant.backend.model.Investor;
import com.umakant.backend.repositories.InvestorRepository;
import com.umakant.backend.services.AuthService;
import com.umakant.backend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthServiceMySqlImpl implements AuthService {
    private final InvestorRepository investorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceMySqlImpl(InvestorRepository investorRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.investorRepository = investorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthDTO.AuthResponse signup(AuthDTO.SignupRequest request) {
        if (investorRepository.existsByEmail(request.email)) {
            throw new RuntimeException("Email already registered");
        }

        Investor.RiskAppetite riskAppetite = Investor.RiskAppetite.valueOf(request.riskAppetite.toUpperCase());
        Investor.Role role = Investor.Role.valueOf(request.role.toUpperCase());
        Investor investor = request.toInvestor(riskAppetite, role);

        investor.setPassword(passwordEncoder.encode(request.password));

        investorRepository.save(investor);

        String token = jwtUtil.generateToken(investor);

        return AuthDTO.AuthResponse.authResponse(token, investor.getEmail(), investor.getRole().name());
    }

    @Override
    public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
        Investor investor = investorRepository.findByEmail(request.email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password, investor.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(investor);

        return AuthDTO.AuthResponse.authResponse(token, investor.getEmail(), investor.getRole().name());
    }
}
