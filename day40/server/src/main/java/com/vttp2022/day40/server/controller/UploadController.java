package com.vttp2022.day40.server.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day40.server.model.PostDetails;
import com.vttp2022.day40.server.service.S3Service;
import com.vttp2022.day40.server.service.UploadService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@Controller
@RequestMapping
public class UploadController {
    
    @Autowired
    private UploadService uploadService;

    @Autowired
    private S3Service s3Service;

    @PostMapping(path="/post", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> makePost(@RequestPart("image") MultipartFile image, @RequestPart("title") String title, @RequestPart("text") String text) {

        System.out.println(image.getSize());

        // upload to s3 - get image url
        String imageUrl = "";
        try {
            imageUrl = s3Service.upload(image, title, text);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(imageUrl);

        PostDetails p = new PostDetails(title, text, imageUrl, 0, 0);

        // insert into mongo - get objectId/postId
        String postId = uploadService.makePost(p);
        
        return ResponseEntity.ok(Json.createObjectBuilder().add("postId", postId).build().toString());
    }

    @GetMapping(path="/get", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> getPost() {
        
        // get all posts
        List<PostDetails> posts = uploadService.getAllPosts();

        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (PostDetails p: posts) {
            jab.add(p.toJSON());
        }
        JsonArray ja = jab.build();

        return ResponseEntity.ok(ja.toString());
    }
}
