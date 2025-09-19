package com.umakant.backend.security;

import com.umakant.backend.model.Investor;
import com.umakant.backend.repositories.InvestorRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final InvestorRepository investorRepository;

    public CustomUserDetailsService(InvestorRepository investorRepository) {
        this.investorRepository = investorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Investor investor = investorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return User.builder()
                .username(investor.getEmail())
                .password(investor.getPassword())
                .roles(investor.getRole().name()) // USER / ADMIN
                .build();
    }
}
