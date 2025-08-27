package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findByUid(String uid);
}
