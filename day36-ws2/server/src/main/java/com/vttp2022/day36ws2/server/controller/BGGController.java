package com.vttp2022.day36ws2.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vttp2022.day36ws2.server.models.Comment;
import com.vttp2022.day36ws2.server.models.Game;
import com.vttp2022.day36ws2.server.service.BGGService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api")
public class BGGController {

    @Autowired
    private BGGService svc;
    
    @GetMapping(path="/games")
    @ResponseBody
    public ResponseEntity<String> getGames() {

        Optional<List<Game>> opt = svc.getGames();
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(
                Json.createObjectBuilder()
                    .add("error", "Could not find games")
                    .build().toString()
            );
        }

        List<Game> games = opt.get();
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (Game g : games) {
            JsonObject json = g.toJSON();
            jab.add(json);
        }
        JsonArray ja = jab.build();

        return ResponseEntity.status(200).body(ja.toString());
    }

    @GetMapping(path="/game/{id}/comments")
    @ResponseBody
    public ResponseEntity<String> getCommentByGID(@PathVariable int id) {

        Optional<List<Comment>> opt = svc.getCommentsByGID(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(
                Json.createObjectBuilder()
                    .add("error", "Could not find games")
                    .build().toString()
            );
        }

        List<Comment> comments = opt.get();
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (Comment c : comments) {
            JsonObject json = c.toJSON();
            jab.add(json);
        }
        JsonArray ja = jab.build();

        return ResponseEntity.status(200).body(ja.toString());
    }
}
