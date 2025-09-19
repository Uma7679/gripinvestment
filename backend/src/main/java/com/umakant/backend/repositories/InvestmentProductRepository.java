package com.umakant.backend.repositories;


import com.umakant.backend.model.InvestmentProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvestmentProductRepository extends JpaRepository<InvestmentProduct, UUID> {
}
