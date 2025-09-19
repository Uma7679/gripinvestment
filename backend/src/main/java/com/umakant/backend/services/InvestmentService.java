package com.umakant.backend.services;

import com.umakant.backend.dto.InvestmentDTO;

import java.util.List;

public interface InvestmentService {
    InvestmentDTO.InvestmentResponse invest(InvestmentDTO.NewInvestment investmentDTO);
    List<InvestmentDTO.InvestmentResponse> getPortfolio(String investorId);
}
