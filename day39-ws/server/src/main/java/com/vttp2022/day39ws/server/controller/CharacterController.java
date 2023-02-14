package com.vttp2022.day39ws.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vttp2022.day39ws.server.model.MarvelCharacter;
import com.vttp2022.day39ws.server.repository.MongoRepo;
import com.vttp2022.day39ws.server.repository.RedisRepo;
import com.vttp2022.day39ws.server.service.MarvelService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@Controller
@RequestMapping("/api")
public class CharacterController {

    @Autowired
    private MarvelService marvelSvc;

    @Autowired
    private RedisRepo redisRepo;

    @Autowired
    private MongoRepo mongoRepo;
    
    @GetMapping(path="/characters", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> getCharacters(@RequestParam String keyword, @RequestParam int offset) {
        System.out.println("inside get all characters");

        List<MarvelCharacter> characters = marvelSvc.searchCharByStartWith(keyword, offset);
        
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (MarvelCharacter c : characters) {
            JsonObject jo = c.toJSON();

            redisRepo.setKey(String.valueOf(jo.getInt("id")), jo);

            jab.add(jo);
        }
        JsonArray ja = jab.build();
        
        System.out.println("returning array of characters");

        return ResponseEntity.ok(ja.toString());
    }

    @GetMapping(path="/character/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> getCharacterById(@PathVariable String id) {
        System.out.println("inside get character - getting one character");

        if (id.contains("}")) {
            id = id.replace("}", "");
        } else if (id.contains("%7D")) {
            id = id.replace("%7D", "");
        }

        // check if character exists in redis - return
        Optional<MarvelCharacter> cOpt = redisRepo.getCharacterById(id);
        if (!cOpt.isEmpty()) {
            System.out.println("is present in redis, now retrieving comments from mongo");
            MarvelCharacter c = cOpt.get();
            c.setComments(mongoRepo.getComments(id));
            return ResponseEntity.ok(c.toJSON().toString());
        }

        System.out.println("not present in redis, saving to redis now");

        // if not in redis, retrieve details from marvel api
        MarvelCharacter c = marvelSvc.getOneCharById(id);
        // and save to redis
        redisRepo.setKey(String.valueOf(c.getId()), c.toJSON());

        // check if got comments from mongo
        // c.setComments(mongoRepo.getComments(id));

        System.out.println("returning character details");

        // System.out.println("empty > " + c.toJSON());
        return ResponseEntity.ok(c.toJSON().toString());
    }

    @PostMapping(path="/character/{id}", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, 
                 produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> postComment(@PathVariable String id, @RequestPart("comment") String comment) {
        System.out.println("inside post method");

        String objectId = mongoRepo.postComment(id, comment);

        // update comments (id) list in character
        MarvelCharacter c = marvelSvc.getOneCharById(id);
        c.setComments(c.getComments(), objectId);
        
        // update cache
        redisRepo.setKey(String.valueOf(c.getId()), c.toJSON());
        System.out.println("updated cache with new comment");

        System.out.println("returning updated character details");

        return ResponseEntity.ok(c.toJSON().toString());
    }
}
