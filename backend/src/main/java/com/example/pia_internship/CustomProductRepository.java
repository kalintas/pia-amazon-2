package com.example.pia_internship;

import com.mongodb.client.DistinctIterable;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface CustomProductRepository {
    List<String> getDistinctByCategory(String category);
    List<Product> find(Query query);
}
