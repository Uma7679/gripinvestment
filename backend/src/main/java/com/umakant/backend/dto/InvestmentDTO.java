package com.umakant.backend.dto;

import com.umakant.backend.model.Investment;
import com.umakant.backend.model.InvestmentProduct;
import com.umakant.backend.model.Investor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class InvestmentDTO {
    public static class NewInvestment {
        public UUID id;
        public String productId;
        public String productName;
        public BigDecimal amount;
        public String status;
        public BigDecimal expectedReturn;
        public LocalDate maturityDate;

        public Investment toInvestment(Investor investor, InvestmentProduct product, BigDecimal expectedReturn, LocalDate maturityDate) {
            return new Investment(id, investor, product, amount, null, Investment.Status.ACTIVE, expectedReturn, maturityDate);
        }
    }

    public static class InvestmentResponse {
        public UUID id;
        public UUID productId;
        public String productName;
        public BigDecimal amount;
        public String status;
        public BigDecimal expectedReturn;
        public LocalDate maturityDate;

        public InvestmentResponse(UUID id, UUID productId, String productName, BigDecimal amount, String status, BigDecimal expectedReturn, LocalDate maturityDate) {
            this.id = id;
            this.productId = productId;
            this.productName = productName;
            this.amount = amount;
            this.status = status;
            this.expectedReturn = expectedReturn;
            this.maturityDate = maturityDate;
        }

        public InvestmentResponse() {
        }

        public static InvestmentResponse getInvestment(Investment investment){
            return new InvestmentResponse(investment.getInvestmentId(), investment.getProduct().getProductId(), investment.getProduct().getName(), investment.getAmount(), investment.getStatus().toString(), investment.getExpectedReturn(), investment.getMaturityDate());
        }

        public static List<InvestmentResponse> getInvestmentList(List<Investment> investmentList){
            return investmentList.stream().map(investment ->
                    new InvestmentResponse(investment.getInvestmentId(), investment.getProduct().getProductId(), investment.getProduct().getName(), investment.getAmount(), investment.getStatus().toString(), investment.getExpectedReturn(), investment.getMaturityDate())
            ).toList();
        }
    }

}


