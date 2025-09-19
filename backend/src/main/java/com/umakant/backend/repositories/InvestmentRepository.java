package com.umakant.backend.repositories;

import com.umakant.backend.model.Investment;
import com.umakant.backend.model.Investor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface InvestmentRepository extends JpaRepository<Investment, UUID> {
    List<Investment> findByInvestor(Investor investor);
}
