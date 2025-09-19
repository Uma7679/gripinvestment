package com.umakant.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class TransactionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(columnDefinition = "CHAR(36)")
    private UUID userId;

    @Column(length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String endpoint;

    @Enumerated(EnumType.STRING)
    @Column(name = "http_method", nullable = false)
    private HttpMethod httpMethod;

    @Column(name = "status_code", nullable = false)
    private int statusCode;

    @Lob
    private String errorMessage;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public enum HttpMethod {
        GET, POST, PUT, DELETE
    }

    public TransactionLog(Long transactionId, UUID userId, String email, String endpoint, HttpMethod httpMethod, int statusCode, String errorMessage, LocalDateTime createdAt) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.email = email;
        this.endpoint = endpoint;
        this.httpMethod = httpMethod;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.createdAt = createdAt;
    }

    public TransactionLog() {
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long id) {
        this.transactionId = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
