package com.vttp2022.day36ws2.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Comment {
    private int gid;
    private String commentId;
    private String user;
    private int rating;
    private String commentText;

    public int getGid() {
        return gid;
    }
    public void setGid(int gid) {
        this.gid = gid;
    }
    public String getCommentId() {
        return commentId;
    }
    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getCommentText() {
        return commentText;
    }
    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public static Comment create(Document d) {
        Comment c = new Comment();
        c.gid = d.getInteger("gid");
        c.commentId = d.getString("c_id");
        c.user = d.getString("user");
        c.rating = d.getInteger("rating");
        c.commentText = d.getString("c_text");

        return c;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                    .add("gid", gid)
                    .add("commentId", commentId)
                    .add("user", user)
                    .add("rating", rating)
                    .add("commentText", commentText)
                    .build();
    }
}
