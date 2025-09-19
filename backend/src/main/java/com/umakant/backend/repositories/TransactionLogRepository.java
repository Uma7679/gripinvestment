package com.umakant.backend.repositories;

import com.umakant.backend.model.TransactionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionLogRepository extends JpaRepository<TransactionLog, Long> {
    List<TransactionLog> findByUserId(UUID userId);
}
