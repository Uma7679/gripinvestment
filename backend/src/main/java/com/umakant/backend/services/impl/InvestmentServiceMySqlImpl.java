package com.umakant.backend.services.impl;

import com.umakant.backend.dto.InvestmentDTO;
import com.umakant.backend.model.Investment;
import com.umakant.backend.model.InvestmentProduct;
import com.umakant.backend.model.Investor;
import com.umakant.backend.repositories.InvestmentRepository;
import com.umakant.backend.repositories.InvestorRepository;
import com.umakant.backend.repositories.InvestmentProductRepository;
import com.umakant.backend.services.InvestmentService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class InvestmentServiceMySqlImpl implements InvestmentService {
    private final InvestmentRepository investmentRepository;
    private final InvestorRepository investorRepository;
    private final InvestmentProductRepository investmentProductRepository;

    public InvestmentServiceMySqlImpl(InvestmentRepository investmentRepository, InvestorRepository investorRepository, InvestmentProductRepository investmentProductRepository) {
        this.investmentRepository = investmentRepository;
        this.investorRepository = investorRepository;
        this.investmentProductRepository = investmentProductRepository;
    }

    @Override
    public InvestmentDTO.InvestmentResponse invest(InvestmentDTO.NewInvestment dto) {
        Investor investor = investorRepository.findById(dto.id)
                .orElseThrow(() -> new RuntimeException("Investor not found"));

        InvestmentProduct product = investmentProductRepository.findById(UUID.fromString(dto.productId))
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (dto.amount.compareTo(product.getMinInvestment()) < 0) {
            throw new RuntimeException("Amount is less than minimum investment");
        }

        if (product.getMaxInvestment() != null && dto.amount.compareTo(product.getMaxInvestment()) > 0) {
            throw new RuntimeException("Amount exceeds maximum investment");
        }

        BigDecimal expectedReturn = dto.amount
                .multiply(product.getAnnualYield())
                .divide(BigDecimal.valueOf(100));

        Investment investment = dto.toInvestment(investor, product, expectedReturn, LocalDate.now().plusMonths(product.getTenureMonths()));


        investmentRepository.save(investment);

        return InvestmentDTO.InvestmentResponse.getInvestment(investment);
    }

    @Override
    public List<InvestmentDTO.InvestmentResponse> getPortfolio(String investorId) {
        Investor investor = investorRepository.findById(UUID.fromString(investorId))
                .orElseThrow(() -> new RuntimeException("Investor not found"));

        List<Investment> investmentList = investmentRepository.findByInvestor(investor);
        return InvestmentDTO.InvestmentResponse.getInvestmentList(investmentList);
    }

}
