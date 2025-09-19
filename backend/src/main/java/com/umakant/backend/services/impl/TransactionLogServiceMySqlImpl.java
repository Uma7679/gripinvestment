package com.umakant.backend.services.impl;

import com.umakant.backend.dto.TransactionLogDTO;
import com.umakant.backend.repositories.TransactionLogRepository;
import com.umakant.backend.services.TransactionLogService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class TransactionLogServiceMySqlImpl implements TransactionLogService {
    private final TransactionLogRepository logRepository;

    public TransactionLogServiceMySqlImpl(TransactionLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public List<TransactionLogDTO.TransactionLogResponse> getAllLogs() {
        return TransactionLogDTO.TransactionLogResponse.getTransactionLogList(logRepository.findAll());
    }

    @Override
    public List<TransactionLogDTO.TransactionLogResponse> getLogsByInvestor(UUID investorId) {
        return TransactionLogDTO.TransactionLogResponse.getTransactionLogList(logRepository.findByUserId(investorId));
    }
}
