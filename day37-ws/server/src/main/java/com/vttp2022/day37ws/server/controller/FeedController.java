package com.vttp2022.day37ws.server.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day37ws.server.model.FileData;
import com.vttp2022.day37ws.server.model.PostDetails;
import com.vttp2022.day37ws.server.service.PostService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping("/api")
public class FeedController {

    @Autowired
    private PostService svc;
    
    @PostMapping(path="/post", consumes=MediaType.MULTIPART_FORM_DATA_VALUE,
                produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> makeAPost(@RequestPart("comments") String comments, @RequestPart("picture") MultipartFile picture) {
        System.out.println("in controller - post");

        String postId = UUID.randomUUID().toString().substring(0,8);

        try {
            svc.postToFeed(postId, comments, picture);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(Json.createObjectBuilder().add("error", e.getMessage()).toString());
        }

        return ResponseEntity.ok(Json.createObjectBuilder().add("postId", postId).build().toString());
    }

    @GetMapping(path="/get/{postId}", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> retrievePost(@PathVariable String postId) {
        System.out.println("in controller - get");

        Optional<PostDetails> optP = svc.getPostDetails(postId);
        System.out.println("comment > %s".formatted(optP.get().getComments()));

        JsonObject json = Json.createObjectBuilder()
                                .add("postId", postId)
                                .add("comment", optP.get().getComments())
                                .build();

        return ResponseEntity.ok(json.toString());
    }

    @GetMapping(path="/get/{postId}/image", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> retrieveImage(@PathVariable String postId) {

        System.out.println("in controller - get image");

        Optional<FileData> optF = svc.getImageFromPost(postId);
        String encodedString = Base64.getEncoder().encodeToString(optF.get().getPicture());
        // System.out.println(encodedString);
        System.out.println("opt is empty? %s".formatted(optF.isEmpty()));

        // System.out.println(Json.createObjectBuilder().add("picture", encodedString).build());

        // does not return the right json object

        return ResponseEntity.ok(Json.createObjectBuilder().add("picture", encodedString).build().toString());
    }
}
