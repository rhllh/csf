package com.vttp2022.csfreassessment.server.model;

import java.util.Date;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Listing {
    
    private String postingId;
    private String postingDate = new Date().toString();
    private String name;
    private String email;
    private String phone;
    private String title;
    private String description;
    private String imageUrl;

    public Listing() {}

    public Listing(String id, String name, String email, 
                String phone, String title, String description) {
        this.postingId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.title = title;
        this.description = description;
    }

    public String getPostingId() {
        return postingId;
    }
    public void setPostingId(String postingId) {
        this.postingId = postingId;
    }
    public String getPostingDate() {
        return postingDate;
    }
    public void setPostingDate(String postingDate) {
        this.postingDate = postingDate;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                    .add("postingId", getPostingId())
                    .add("postingDate", getPostingDate().toString())
                    .add("name", getName())
                    .add("email", getEmail())
                    .add("phone", getPhone() == null ? "" : getPhone())
                    .add("title", getTitle())
                    .add("description", getDescription())
                    .add("image", getImageUrl())
                    .build();
    }

    public static Listing fromCache(JsonObject obj) {
        Listing li = new Listing();

        li.setPostingId(obj.getString("postingId"));
        li.setPostingDate(obj.getString("postingDate"));
        li.setName(obj.getString("name"));
        li.setEmail(obj.getString("email"));
        li.setPhone(obj.getString("phone") == null ? "" : obj.getString("phone"));
        li.setTitle(obj.getString("title"));
        li.setDescription(obj.getString("description"));
        li.setImageUrl(obj.getString("image"));

        return li;
    }

    public Document toDocument() {
        Document d = new Document();

        d.append("posting_id", getPostingId());
        d.append("posting_date", getPostingDate());
        d.append("name", getName());
        d.append("email", getEmail());
        d.append("phone", getPhone() == null ? "" : getPhone());
        d.append("title", getTitle());
        d.append("description", getDescription());
        d.append("image", getImageUrl());

        return d;
    }
    
}
