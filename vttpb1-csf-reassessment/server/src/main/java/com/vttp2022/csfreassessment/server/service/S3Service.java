package com.vttp2022.csfreassessment.server.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    
    public String upload(MultipartFile file, String title, String key, String date) throws IOException {

        // create user metadata
        Map<String, String> userData = new HashMap<>();
        userData.put("title", title);
        userData.put("uploadDate", date);
        userData.put("originalFilename", file.getOriginalFilename());
        
        // create metadata for object
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userData);

        // create put request
        PutObjectRequest por = new PutObjectRequest(
                                    "fkdl", 
                                    "reassessment/%s".formatted(key), 
                                    file.getInputStream(), 
                                    metadata);

        // allow public access
        por = por.withCannedAcl(CannedAccessControlList.PublicRead);

        // "upload" object to s3 storage
        s3client.putObject(por);

        return "https://fkdl.sgp1.digitaloceanspaces.com/reassessment%2F" + key;
    }
}
