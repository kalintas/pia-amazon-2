package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<String> getDistinctByCategory(String category) {
        List<String> result = new ArrayList<>();
        var categories = mongoTemplate.getCollection("products").distinct("category", String.class);
        categories.forEach(result::add); // Put all the strings into the list.
        return result;
    }

    @Override
    public List<Product> find(Query query) {
        return mongoTemplate.find(query, Product.class, "products");
    }
}
