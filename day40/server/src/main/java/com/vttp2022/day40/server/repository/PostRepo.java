package com.vttp2022.day40.server.repository;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.vttp2022.day40.server.model.PostDetails;

@Repository
public class PostRepo {
    
    @Autowired
    private MongoTemplate template;

    public String addPost(PostDetails post) {
        
        Document d = post.toDocument();
        Document inserted = template.insert(d, "posts");

        return inserted.getObjectId("_id").toString();
        
    }

    public List<PostDetails> getAllPosts() {

        List<Document> posts = template.find(new Query(), Document.class, "posts");

        List<PostDetails> postList = new LinkedList<>();
        for (Document d : posts) {
            // convert to PostDetails
            PostDetails p = PostDetails.create(d);

            postList.add(p);
        }

        return postList;
    }
}
