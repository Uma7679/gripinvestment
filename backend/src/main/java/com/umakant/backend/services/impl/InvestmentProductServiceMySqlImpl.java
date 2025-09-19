package com.umakant.backend.services.impl;

import com.umakant.backend.dto.InvestmentProductDTO;
import com.umakant.backend.model.InvestmentProduct;
import com.umakant.backend.repositories.InvestmentProductRepository;
import com.umakant.backend.services.InvestmentProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InvestmentProductServiceMySqlImpl implements InvestmentProductService {
    private final InvestmentProductRepository investmentProductRepository;

    public InvestmentProductServiceMySqlImpl(InvestmentProductRepository investmentProductRepository) {
        this.investmentProductRepository = investmentProductRepository;
    }

    @Override
    public List<InvestmentProductDTO.InvestmentProductResponse> getAllProducts() {
        List<InvestmentProduct> investmentProductDTOList = investmentProductRepository.findAll();
        return InvestmentProductDTO.InvestmentProductResponse.getInvestmentProductResponseList(investmentProductDTOList);
    }

    @Override
    public InvestmentProductDTO.InvestmentProductResponse getProductById(String id) {
        InvestmentProduct product = investmentProductRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return InvestmentProductDTO.InvestmentProductResponse.getInvestmentProductResponse(product);
    }

    @Override
    public InvestmentProductDTO.InvestmentProductResponse createProduct(InvestmentProductDTO.NewInvestmentProduct dto) {
        InvestmentProduct product = dto.toInvestmentProduct();
        return InvestmentProductDTO.InvestmentProductResponse.getInvestmentProductResponse(product);
    }

    @Override
    public InvestmentProductDTO.InvestmentProductResponse updateProduct(String id, InvestmentProductDTO dto) {
        InvestmentProduct product = investmentProductRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return InvestmentProductDTO.InvestmentProductResponse.getInvestmentProductResponse(product);
    }

    @Override
    public void deleteProduct(String id) {
        investmentProductRepository.deleteById(UUID.fromString(id));
    }

}
