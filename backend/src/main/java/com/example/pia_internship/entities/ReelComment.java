package com.example.pia_internship.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "reelComments")
public class ReelComment {
    @MongoId
    private String id;
    private String reelId;
    private String comment;
    private int likes;
    private int dislikes;
    private List<String> subComments;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public List<String> getSubComments() {
        return subComments;
    }

    public void setSubComments(List<String> subComments) {
        this.subComments = subComments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReelId() {
        return reelId;
    }

    public void setReelId(String reelId) {
        this.reelId = reelId;
    }
}
