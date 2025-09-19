package com.umakant.backend.services.impl;

import com.umakant.backend.dto.InvestorDTO;
import com.umakant.backend.model.Investor;
import com.umakant.backend.repositories.InvestorRepository;
import com.umakant.backend.services.InvestorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class InvestorServiceMySqlImpl implements InvestorService {
    private final InvestorRepository investorRepository;

    public InvestorServiceMySqlImpl(InvestorRepository investorRepository) {
        this.investorRepository = investorRepository;
    }

    @Override
    public InvestorDTO.InvestorDtoResponse getInvestorById(UUID id) {
        Investor investor = investorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investor not found"));

        return InvestorDTO.InvestorDtoResponse.getInvestor(investor);
    }

    @Override
    public List<InvestorDTO.InvestorDtoResponse> getAllInvestors() {
        List<Investor> investorList = investorRepository.findAll();
        return InvestorDTO.InvestorDtoResponse.getInvestorList(investorList);
    }
}
