package com.umakant.backend.dto;

import com.umakant.backend.model.Investor;

public class AuthDTO {
    public static class SignupRequest {
        public String firstName;
        public String lastName;
        public String email;
        public String password;
        public String riskAppetite;
        public String role;

        public Investor toInvestor(Investor.RiskAppetite riskAppetite, Investor.Role role){
            return new Investor(null, firstName, lastName, email, password, riskAppetite, null, null, role);
        }
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class AuthResponse {
        public String token;
        public String email;
        public String role;

        public AuthResponse(String token, String email, String role) {
            this.token = token;
            this.email = email;
            this.role = role;
        }

        public static AuthResponse authResponse(String token, String email, String role) {
            return new AuthResponse(token, email, role);
        }
    }
}
