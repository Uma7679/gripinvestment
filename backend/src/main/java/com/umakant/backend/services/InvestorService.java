package com.umakant.backend.services;

import com.umakant.backend.dto.InvestorDTO;

import java.util.List;
import java.util.UUID;

public interface InvestorService {
    InvestorDTO.InvestorDtoResponse getInvestorById(UUID id);
    List<InvestorDTO.InvestorDtoResponse> getAllInvestors();
}
