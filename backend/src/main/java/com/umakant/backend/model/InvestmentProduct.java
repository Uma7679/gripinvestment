package com.umakant.backend.model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class InvestmentProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productId;

    @Column(nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "investment_type", nullable = false)
    private InvestmentType investmentType;

    @Column(name = "tenure_months", nullable = false)
    private int tenureMonths;

    @Column(name = "annual_yield", precision = 5, scale = 2, nullable = false)
    private BigDecimal annualYield;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false)
    private RiskLevel riskLevel;

    @Column(name = "min_investment", precision = 12, scale = 2, nullable = false)
    private BigDecimal minInvestment = BigDecimal.valueOf(1000.00);

    @Column(name = "max_investment", precision = 12, scale = 2)
    private BigDecimal maxInvestment;

    @Lob
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum InvestmentType {
        BOND, FD, MF, ETF, OTHER
    }

    public enum RiskLevel {
        LOW, MODERATE, HIGH
    }

    public InvestmentProduct(UUID productId, String name, InvestmentType investmentType, int tenureMonths, BigDecimal annualYield, RiskLevel riskLevel, BigDecimal minInvestment, BigDecimal maxInvestment, String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.productId = productId;
        this.name = name;
        this.investmentType = investmentType;
        this.tenureMonths = tenureMonths;
        this.annualYield = annualYield;
        this.riskLevel = riskLevel;
        this.minInvestment = minInvestment;
        this.maxInvestment = maxInvestment;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public InvestmentProduct() {
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID id) {
        this.productId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public InvestmentType getInvestmentType() {
        return investmentType;
    }

    public void setInvestmentType(InvestmentType investmentType) {
        this.investmentType = investmentType;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public BigDecimal getAnnualYield() {
        return annualYield;
    }

    public void setAnnualYield(BigDecimal annualYield) {
        this.annualYield = annualYield;
    }

    public RiskLevel getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(RiskLevel riskLevel) {
        this.riskLevel = riskLevel;
    }

    public BigDecimal getMinInvestment() {
        return minInvestment;
    }

    public void setMinInvestment(BigDecimal minInvestment) {
        this.minInvestment = minInvestment;
    }

    public BigDecimal getMaxInvestment() {
        return maxInvestment;
    }

    public void setMaxInvestment(BigDecimal maxInvestment) {
        this.maxInvestment = maxInvestment;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
