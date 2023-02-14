package com.vttp2022.day37.service;

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
    private AmazonS3 s3Client;

    public String upload(MultipartFile file, String name) throws IOException {

        // create user data
        Map<String, String> userData = new HashMap<>();
        userData.put("name", name);
        userData.put("uploadTime", (new Date().toString()));
        userData.put("originalFilename", file.getOriginalFilename());

        // metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userData);

        String key = UUID.randomUUID().toString().substring(0,8);

        // create a put request
        PutObjectRequest por = new PutObjectRequest("fkdl", 
                                    "myobjects/%s".formatted(key), 
                                    file.getInputStream(), 
                                    metadata);

        // allow public access
        por = por.withCannedAcl(CannedAccessControlList.PublicRead);

        s3Client.putObject(por);

        return key;

    }
}
