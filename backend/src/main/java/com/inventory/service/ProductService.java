package com.inventory.service;

import com.inventory.dto.ProductDTO;
import java.util.List;
import java.util.Map;

public interface ProductService {
    ProductDTO createProduct(ProductDTO dto);
    ProductDTO getProductById(Long id);
    List<ProductDTO> getAllProducts();
    ProductDTO updateProduct(Long id, ProductDTO dto);
    void deleteProduct(Long id);
    List<ProductDTO> searchByName(String name);
    List<ProductDTO> getByCategory(String category);
    List<ProductDTO> getLowStockProducts();
    List<String> getAllCategories();
    Map<String, Object> getDashboardStats();
}
