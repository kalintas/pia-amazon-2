package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.Reel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Repository;

@Repository
public class CustomReelRepositoryImpl implements CustomReelRepository {
    @Autowired
    private MongoTemplate mongoTemplate;


    @Override
    public Reel getRandomReel() {
        var aggregation = Aggregation.newAggregation(
            Aggregation.sample(1)
        );
        var aggregationResult = mongoTemplate.aggregate(
                aggregation, "reels", Reel.class
        );

        return aggregationResult.getUniqueMappedResult();
    }
}
