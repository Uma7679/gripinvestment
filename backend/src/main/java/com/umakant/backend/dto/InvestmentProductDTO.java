package com.umakant.backend.dto;

import com.umakant.backend.model.InvestmentProduct;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class InvestmentProductDTO {
    public static class NewInvestmentProduct{
        public UUID id;
        public String name;
        public InvestmentProduct.InvestmentType investmentType;
        public int tenureMonths;
        public BigDecimal annualYield;
        public InvestmentProduct.RiskLevel riskLevel;
        public BigDecimal minInvestment;
        public BigDecimal maxInvestment;
        public String description;

        public InvestmentProduct toInvestmentProduct(){
            return new InvestmentProduct(id, name, investmentType, tenureMonths, annualYield, riskLevel, minInvestment, maxInvestment, description, null, null);
        }
    }

    public static class InvestmentProductResponse{
        public UUID id;
        public String name;
        public InvestmentProduct.InvestmentType investmentType;
        public int tenureMonths;
        public BigDecimal annualYield;
        public InvestmentProduct.RiskLevel riskLevel;
        public BigDecimal minInvestment = BigDecimal.valueOf(1000.00);
        public BigDecimal maxInvestment;
        public String description;

        public InvestmentProductResponse(UUID id, String name, InvestmentProduct.InvestmentType investmentType, int tenureMonths, BigDecimal annualYield, InvestmentProduct.RiskLevel riskLevel, BigDecimal minInvestment, BigDecimal maxInvestment, String description) {
            this.id = id;
            this.name = name;
            this.investmentType = investmentType;
            this.tenureMonths = tenureMonths;
            this.annualYield = annualYield;
            this.riskLevel = riskLevel;
            this.minInvestment = minInvestment;
            this.maxInvestment = maxInvestment;
            this.description = description;
        }

        public InvestmentProductResponse() {
        }

        public static InvestmentProductResponse getInvestmentProductResponse(InvestmentProduct investmentProduct){
            return new InvestmentProductResponse(investmentProduct.getProductId(), investmentProduct.getName(), investmentProduct.getInvestmentType(), investmentProduct.getTenureMonths(), investmentProduct.getAnnualYield(), investmentProduct.getRiskLevel(), investmentProduct.getMinInvestment(), investmentProduct.getMaxInvestment(), investmentProduct.getDescription());
        }

        public static List<InvestmentProductResponse> getInvestmentProductResponseList(List<InvestmentProduct> investmentProductList){
            return investmentProductList.stream().map(investmentProduct ->
                new InvestmentProductResponse(investmentProduct.getProductId(), investmentProduct.getName(), investmentProduct.getInvestmentType(), investmentProduct.getTenureMonths(), investmentProduct.getAnnualYield(), investmentProduct.getRiskLevel(), investmentProduct.getMinInvestment(), investmentProduct.getMaxInvestment(), investmentProduct.getDescription())
            ).toList();
        }
    }
}
