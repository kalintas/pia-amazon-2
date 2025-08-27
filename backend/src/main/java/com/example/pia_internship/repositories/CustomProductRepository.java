package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.Product;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface CustomProductRepository {
    List<String> getDistinctByCategory(String category);
    List<Product> find(Query query);
}
