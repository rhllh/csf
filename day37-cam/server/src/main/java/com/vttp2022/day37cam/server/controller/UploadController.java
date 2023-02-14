package com.vttp2022.day37cam.server.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day37cam.server.service.S3Service;

import jakarta.json.Json;

@Controller
@RequestMapping
public class UploadController {
    
    @Autowired
    private S3Service svc;

    @PostMapping(path="/upload", 
                consumes=MediaType.MULTIPART_FORM_DATA_VALUE, 
                produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> upload(@RequestPart MultipartFile file, 
                                        @RequestPart String title, 
                                        @RequestPart String comment) {
        
        String key = "";

        System.out.println("title %s".formatted(title));
        System.out.println("comment %s".formatted(comment));
        System.out.println("file name %s".formatted(file.getOriginalFilename()));
        System.out.println("content type %s".formatted(file.getContentType()));

        try {
            key = svc.upload(file, title, comment);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(Json.createObjectBuilder()
                                .add("key", key)
                                .toString()
                            );
    }
}
