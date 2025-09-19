package com.umakant.backend.controller;

import com.umakant.backend.dto.InvestmentProductDTO;
import com.umakant.backend.services.InvestmentProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
public class InvestmentProductController {
    private final InvestmentProductService investmentProductService;

    public InvestmentProductController(InvestmentProductService investmentProductService) {
        this.investmentProductService = investmentProductService;
    }

    @GetMapping
    public ResponseEntity<List<InvestmentProductDTO.InvestmentProductResponse>> getAllProducts() {
        return ResponseEntity.ok(investmentProductService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentProductDTO.InvestmentProductResponse> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(investmentProductService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<InvestmentProductDTO.InvestmentProductResponse> createProduct(@RequestBody InvestmentProductDTO.NewInvestmentProduct dto) {
        return ResponseEntity.ok(investmentProductService.createProduct(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentProductDTO.InvestmentProductResponse> updateProduct(@PathVariable String id,
                                                              @RequestBody InvestmentProductDTO dto) {
        return ResponseEntity.ok(investmentProductService.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        investmentProductService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
