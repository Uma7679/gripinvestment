package com.umakant.backend.services;

import com.umakant.backend.dto.TransactionLogDTO;

import java.util.List;
import java.util.UUID;

public interface TransactionLogService {
    List<TransactionLogDTO.TransactionLogResponse> getAllLogs();
    List<TransactionLogDTO.TransactionLogResponse> getLogsByInvestor(UUID investorId);
}
