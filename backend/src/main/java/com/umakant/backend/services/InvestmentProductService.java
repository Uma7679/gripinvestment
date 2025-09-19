package com.umakant.backend.services;

import com.umakant.backend.dto.InvestmentProductDTO;

import java.util.List;

public interface InvestmentProductService {
    List<InvestmentProductDTO.InvestmentProductResponse> getAllProducts();
    InvestmentProductDTO.InvestmentProductResponse getProductById(String id);
    InvestmentProductDTO.InvestmentProductResponse createProduct(InvestmentProductDTO.NewInvestmentProduct dto);
    InvestmentProductDTO.InvestmentProductResponse updateProduct(String id, InvestmentProductDTO dto);
    void deleteProduct(String id);
}
