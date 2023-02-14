package com.vttp2022.day40.server.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 s3client;
    
    public String upload(MultipartFile file, String title, String text) throws IOException {

        // create user metadata
        Map<String, String> userData = new HashMap<>();
        userData.put("title", title);
        userData.put("text", text);
        userData.put("uploadTime", new Date().toString());
        userData.put("originalFilename", file.getOriginalFilename());
        
        // create metadata for object
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userData);

        // generate key for object
        String key = UUID.randomUUID().toString().substring(0,8);

        // create put request
        PutObjectRequest por = new PutObjectRequest(
                                    "fkdl", 
                                    "posts/%s".formatted(key), 
                                    file.getInputStream(), 
                                    metadata);

        // allow public access
        por = por.withCannedAcl(CannedAccessControlList.PublicRead);

        // "upload" object to s3 storage
        s3client.putObject(por);

        return "https://fkdl.sgp1.digitaloceanspaces.com/posts%2F" + key;
    }
}
