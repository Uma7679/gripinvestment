package com.umakant.backend.repositories;

import com.umakant.backend.model.Investor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvestorRepository extends JpaRepository<Investor, UUID> {
    Optional<Investor> findByEmail(String email);
    boolean existsByEmail(String email);
}
