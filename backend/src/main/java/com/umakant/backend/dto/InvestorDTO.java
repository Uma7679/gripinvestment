package com.umakant.backend.dto;

import com.umakant.backend.model.Investor;

import java.util.List;
import java.util.UUID;

public class InvestorDTO {
    public static class InvestorDtoResponse{
        public UUID id;
        public String firstName;
        public String lastName;
        public String email;
        public Investor.RiskAppetite riskAppetite;

        public InvestorDtoResponse(UUID id, String firstName, String lastName, String email, Investor.RiskAppetite riskAppetite) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.riskAppetite = riskAppetite;
        }

        public InvestorDtoResponse() {
        }

        public static InvestorDTO.InvestorDtoResponse getInvestor(Investor investor){
            return new InvestorDtoResponse(investor.getInvestorId(), investor.getFirstName(), investor.getLastName(), investor.getEmail(), investor.getRiskAppetite());
        }

        public static List<InvestorDTO.InvestorDtoResponse> getInvestorList(List<Investor> investorList){
            return investorList.stream().map(investor ->
                    new InvestorDtoResponse(investor.getInvestorId(), investor.getFirstName(), investor.getLastName(), investor.getEmail(), investor.getRiskAppetite())
            ).toList();
        }
    }
}
