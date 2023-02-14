package com.vttp2022.day40.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttp2022.day40.server.model.PostDetails;
import com.vttp2022.day40.server.repository.PostRepo;

@Service
public class UploadService {

    @Autowired
    private PostRepo repo;
    
    public String makePost(PostDetails p) {
        return repo.addPost(p);
    }

    public List<PostDetails> getAllPosts() {
        return repo.getAllPosts();
    }
}
