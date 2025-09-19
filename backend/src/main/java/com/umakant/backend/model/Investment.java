package com.umakant.backend.model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID investmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Investor investor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private InvestmentProduct product;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @CreationTimestamp
    @Column(name = "invested_at", updatable = false)
    private LocalDateTime investedAt;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @Column(name = "expected_return", precision = 12, scale = 2)
    private BigDecimal expectedReturn;

    @Column(name = "maturity_date")
    private LocalDate maturityDate;

    public enum Status {
        ACTIVE, MATURED, CANCELLED
    }

    public Investment(UUID investmentId, Investor investor, InvestmentProduct product, BigDecimal amount, LocalDateTime investedAt, Status status, BigDecimal expectedReturn, LocalDate maturityDate) {
        this.investmentId = investmentId;
        this.investor = investor;
        this.product = product;
        this.amount = amount;
        this.investedAt = investedAt;
        this.status = status;
        this.expectedReturn = expectedReturn;
        this.maturityDate = maturityDate;
    }

    public Investment() {
    }

    public UUID getInvestmentId() {
        return investmentId;
    }

    public void setInvestmentId(UUID id) {
        this.investmentId = id;
    }

    public Investor getInvestor() {
        return investor;
    }

    public void setInvestor(Investor investor) {
        this.investor = investor;
    }

    public InvestmentProduct getProduct() {
        return product;
    }

    public void setProduct(InvestmentProduct product) {
        this.product = product;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getInvestedAt() {
        return investedAt;
    }

    public void setInvestedAt(LocalDateTime investedAt) {
        this.investedAt = investedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public BigDecimal getExpectedReturn() {
        return expectedReturn;
    }

    public void setExpectedReturn(BigDecimal expectedReturn) {
        this.expectedReturn = expectedReturn;
    }

    public LocalDate getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(LocalDate maturityDate) {
        this.maturityDate = maturityDate;
    }
}
