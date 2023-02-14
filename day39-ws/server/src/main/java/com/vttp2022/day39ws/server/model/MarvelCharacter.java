package com.vttp2022.day39ws.server.model;

import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;

public class MarvelCharacter {
    private Integer id;
    private String name;
    private String description;
    private String thumbnail;
    private String details;
    private List<String> comments = new LinkedList<>();

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getThumbnail() {
        return thumbnail;
    }
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    public List<String> getComments() {
        return comments;
    }
    public void setComments(List<String> comments) {
        this.comments = comments;
    }
    public void setComments(List<String> comments, String id) {
        List<String> newlist = new LinkedList<>();
        for (String c : comments) {
            newlist.add(c);
        }
        newlist.add(id);

        this.comments = newlist;
    }

    public static MarvelCharacter create(JsonObject obj) {
        MarvelCharacter c = new MarvelCharacter();
        
        c.setId(obj.getInt("id"));
        c.setName(obj.getString("name"));
        c.setDescription(obj.getString("description").trim().length() > 0 ? obj.getString("description") : "No description");
        JsonObject img = obj.getJsonObject("thumbnail");
        c.setThumbnail("%s.%s".formatted(img.getString("path"), img.getString("extension")));
        JsonArray urls = obj.getJsonArray("urls");
        for (int i = 0; i < urls.size(); i++) {
            JsonObject d = urls.getJsonObject(i);
            if (d.getString("type").equals("detail")) {
                c.setDetails(d.getString("url"));
                break;
            }
        }
        // there is no comments to set as this comes from marvel api

        return c;
    }

    public static MarvelCharacter fromCache(JsonObject obj) {
        MarvelCharacter c = new MarvelCharacter();

        c.setId(obj.getInt("id"));
        c.setName(obj.getString("name"));
        c.setDescription(obj.getString("description"));
        c.setThumbnail(obj.getString("thumbnail"));
        c.setDetails(obj.getString("details"));
        c.setComments(createCommentsListFromJA(obj.getJsonArray("comments")));

        return c;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("id", getId())
                .add("name", getName())
                .add("description", getDescription())
                .add("thumbnail", getThumbnail())
                .add("details", getDetails())
                .add("comments", createCommentsJAFromList())
                .build();
    }

    public JsonArray createCommentsJAFromList() {
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (String id : comments) {
            jab.add(id);
        }
        return jab.build();
    }

    public static List<String> createCommentsListFromJA(JsonArray ja) {
        List<String> li = new LinkedList<>();
        for (JsonValue v : ja) {
            li.add(v.toString());
        }

        return li;
    }
    
    
}
