package com.vttp2022.day36ws2.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Game {
    private int gid;
    private String name;

    public static Game create(Document d) {
        Game g = new Game();
        g.gid = d.getInteger("gid");
        g.name = d.getString("name");

        return g;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                    .add("gid", gid)
                    .add("name", name)
                    .build();
    }
    
}
