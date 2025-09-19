package com.umakant.backend.dto;

import com.umakant.backend.model.TransactionLog;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TransactionLogDTO {
    public static class TransactionLogResponse{
        public Long id;
        public UUID userId;
        public String email;
        public String endpoint;
        public TransactionLog.HttpMethod httpMethod;
        public int statusCode;
        public String errorMessage;
        public LocalDateTime createdAt;

        public TransactionLogResponse(Long id, UUID userId, String email, String endpoint, TransactionLog.HttpMethod httpMethod, int statusCode, String errorMessage, LocalDateTime createdAt) {
            this.id = id;
            this.userId = userId;
            this.email = email;
            this.endpoint = endpoint;
            this.httpMethod = httpMethod;
            this.statusCode = statusCode;
            this.errorMessage = errorMessage;
            this.createdAt = createdAt;
        }

        public TransactionLogResponse() {
        }

        public static TransactionLogResponse getTransactionLog(TransactionLog transactionLog){
            return new TransactionLogResponse(transactionLog.getTransactionId(), transactionLog.getUserId(), transactionLog.getEmail(), transactionLog.getEndpoint(), transactionLog.getHttpMethod(), transactionLog.getStatusCode(), transactionLog.getErrorMessage(), transactionLog.getCreatedAt());
        }

        public static List<TransactionLogResponse> getTransactionLogList(List<TransactionLog> transactionLogList){
            return transactionLogList.stream().map(transactionLog ->
                    new TransactionLogResponse(transactionLog.getTransactionId(), transactionLog.getUserId(), transactionLog.getEmail(), transactionLog.getEndpoint(), transactionLog.getHttpMethod(), transactionLog.getStatusCode(), transactionLog.getErrorMessage(), transactionLog.getCreatedAt())
            ).toList();
        }
    }
}
