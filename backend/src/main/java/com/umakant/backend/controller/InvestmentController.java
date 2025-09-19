package com.umakant.backend.controller;


import com.umakant.backend.dto.InvestmentDTO;
import com.umakant.backend.services.InvestmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {
    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @PostMapping
    public ResponseEntity<InvestmentDTO.InvestmentResponse> invest(@RequestBody InvestmentDTO.NewInvestment investmentDTO) {
        return ResponseEntity.ok(investmentService.invest(investmentDTO));
    }

    @GetMapping("/portfolio/{investorId}")
    public ResponseEntity<List<InvestmentDTO.InvestmentResponse>> getPortfolio(@PathVariable String investorId) {
        return ResponseEntity.ok(investmentService.getPortfolio(investorId));
    }
}
