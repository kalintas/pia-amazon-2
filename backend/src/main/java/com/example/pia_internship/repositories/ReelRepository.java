package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.Reel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReelRepository extends MongoRepository<Reel, String>, CustomReelRepository {
}
