package com.umakant.backend.controller;

import com.umakant.backend.dto.InvestorDTO;
import com.umakant.backend.services.InvestorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/investors")
public class InvestorController {
    private final InvestorService investorService;

    public InvestorController(InvestorService investorService) {
        this.investorService = investorService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestorDTO.InvestorDtoResponse> getInvestor(@PathVariable UUID id) {
        return ResponseEntity.ok(investorService.getInvestorById(id));
    }

    @GetMapping
    public ResponseEntity<List<InvestorDTO.InvestorDtoResponse>> getAllInvestors() {
        return ResponseEntity.ok(investorService.getAllInvestors());
    }
}
