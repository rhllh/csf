package com.vttp2022.day40.server.model;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class PostDetails {
    private String title;
    private String text;
    private String imageUrl;
    private int upVotes;
    private int downVotes;

    public PostDetails() {}

    public PostDetails(String title, String text, String imageUrl, int upVotes, int downVotes) {
        this.title = title;
        this.text = text;
        this.imageUrl = imageUrl;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }
    
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(int upVotes) {
        this.upVotes = upVotes;
    }

    public int getDownVotes() {
        return downVotes;
    }

    public void setDownVotes(int downVotes) {
        this.downVotes = downVotes;
    }

    public Document toDocument() {
        Document d = new Document();
        d.append("title", getTitle());
        d.append("text", getText());
        d.append("imageUrl", getImageUrl());
        d.append("upvotes", getUpVotes());
        d.append("downvotes", getDownVotes());

        return d;
    }

    public static PostDetails create(Document d) {
        PostDetails p = new PostDetails();
        p.title = d.getString("title");
        p.text = d.getString("text");
        p.imageUrl = d.getString("imageUrl");
        p.upVotes = d.getInteger("upvotes");
        p.downVotes = d.getInteger("downvotes");

        return p;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                    .add("title", getTitle())
                    .add("text", getText())
                    .add("imageUrl", getImageUrl())
                    .add("upvotes", getUpVotes())
                    .add("downvotes", getDownVotes())
                    .build();
    }

    
}
