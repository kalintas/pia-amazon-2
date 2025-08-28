package com.example.pia_internship.repositories;

import com.example.pia_internship.entities.ReelComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReelCommentsRepository extends MongoRepository<ReelComment, String> {

    List<ReelComment> findByReelId(@Param("reelId") String reelId);
}
