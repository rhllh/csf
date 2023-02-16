package com.vttp2022.csfreassessment.server.controller;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.csfreassessment.server.model.Listing;
import com.vttp2022.csfreassessment.server.repository.MongoRepo;
import com.vttp2022.csfreassessment.server.repository.RedisRepo;
import com.vttp2022.csfreassessment.server.service.S3Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping("/api")
public class PostingController {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private RedisRepo redisRepo;

    @Autowired
    private MongoRepo mongoRepo;
    
    @PostMapping(path="/posting", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, 
                 produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    // @CrossOrigin()
    public ResponseEntity<String> postListing(@RequestPart("name") String name, @RequestPart("email") String email,
                            @RequestPart("phone") String phone, @RequestPart("title") String title,
                            @RequestPart("description") String description, @RequestPart("image") MultipartFile image) {
        
        if (!(phone.length() == 8)) phone = "";

        // generate key for object
        String key = UUID.randomUUID().toString().substring(0,8);
        
        Listing li = new Listing(key, name, email, phone, title, description);

        // upload image to s3
        String imageUrl = "";
        try {
            imageUrl = s3Service.upload(image, title, key, li.getPostingDate());
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(imageUrl);

        li.setImageUrl(imageUrl);

        // save listing as json object to redis for 15 minutes
        JsonObject liJson = li.toJSON();
        redisRepo.setKey(li.getPostingId(), liJson);

        // return json object if successful
        return ResponseEntity.ok(liJson.toString());

    }

    @PutMapping(path="/posting/{id}", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    // @CrossOrigin()
    public ResponseEntity<String> confirmListing(@PathVariable String id) {

        // check if posting in redis - retrieve
        Optional<Listing> opt = redisRepo.getPosting(id);

        if (opt.isEmpty()) {
            // return posting id not found in "message"
            return ResponseEntity.status(404)
                    .body(Json.createObjectBuilder()
                        .add("message", "Posting ID %s not found".formatted(id))
                        .build()
                        .toString());
        }

        // delete from redis
        redisRepo.deletePosting(id);

        // save listing to mongo
        mongoRepo.insertListing(opt.get());

        // return ok in payload "message"
        return ResponseEntity.ok(Json.createObjectBuilder()
                            .add("message", "Accepted %s".formatted(id))
                            .build()
                            .toString());
    }
}
