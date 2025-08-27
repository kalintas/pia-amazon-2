package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String>, CustomProductRepository {

    List<Product> findByCategory(String category);
}
