package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.ReelComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReelCommentsRepository extends MongoRepository<ReelComment, String> {

    public Optional<ReelComment> findByReelId(@Param("reelId") String reelId);
}
