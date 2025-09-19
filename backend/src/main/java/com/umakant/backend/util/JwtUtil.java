package com.umakant.backend.util;


import com.umakant.backend.model.Investor;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "your-secret-key-should-be-long-and-secure-1234567890";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(Investor investor) {
        long EXPIRATION = 1000 * 60 * 60;
        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXPIRATION);

        return Jwts.builder()
                .subject(investor.getInvestorId().toString())
                .issuedAt(now)
                .expiration(expiry)
                .claim("email", investor.getEmail())
                .claim("firstName", investor.getFirstName())
                .claim("lastName", investor.getLastName())
                .claim("role", investor.getRole().name())
                .signWith(key)
                .compact();
    }

    public String extractInvestorId(String token) {
        return getClaims(token).getSubject(); // investorId (UUID string)
    }

    public String extractEmail(String token) {
        return getClaims(token).get("email", String.class);
    }

    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

//    public String extractEmail(String token) {
//        return getClaims(token).getSubject();
//    }
//
//    public String extractRole(String token) {
//        return (String) getClaims(token).get("role");
//    }

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        Jwt<?, Claims> jwt = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        return jwt.getPayload();
    }
}
