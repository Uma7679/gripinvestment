package com.umakant.backend.controller;

import com.umakant.backend.dto.TransactionLogDTO;
import com.umakant.backend.services.TransactionLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/logs")
public class TransactionLogController {
    private final TransactionLogService logService;

    public TransactionLogController(TransactionLogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionLogDTO.TransactionLogResponse>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    @GetMapping("/investor/{investorId}")
    public ResponseEntity<List<TransactionLogDTO.TransactionLogResponse>> getLogsByInvestor(@PathVariable UUID investorId) {
        return ResponseEntity.ok(logService.getLogsByInvestor(investorId));
    }
}
