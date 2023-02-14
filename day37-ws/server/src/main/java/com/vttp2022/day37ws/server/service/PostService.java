package com.vttp2022.day37ws.server.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day37ws.server.model.FileData;
import com.vttp2022.day37ws.server.model.PostDetails;
import com.vttp2022.day37ws.server.repository.FeedRepo;

@Service
public class PostService {
    
    @Autowired
    private FeedRepo repo;

    public boolean postToFeed(String postId, String comments, MultipartFile pic) throws IOException {
        System.out.println("in service");
        
        return repo.postToFeed(postId, comments, pic);
    }

    public Optional<FileData> getImageFromPost(String postId) {

        return repo.getPicFromFeed(postId);
    }

    public Optional<PostDetails> getPostDetails(String postId) {

        return repo.getPostFromFeed(postId);
    }
}
