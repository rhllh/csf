package com.vttp2022.day39ws.server.repository;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MongoRepo {
    
    @Autowired
    private MongoTemplate template;

    public List<String> getComments(String id) {
        List<Document> commentList = template.find(
                    Query.query(Criteria.where("id").is(id)).with(Sort.by(Sort.Direction.DESC, "timestamp")).limit(10), 
                                Document.class, "comments");

        List<String> commentIds = new LinkedList<>();
        if (commentList.size() > 0) {
            for (Document d : commentList) {
                commentIds.add(d.getString("comment"));
            }
        }

        return commentIds;
    }

    public String postComment(String id, String comment) {
        Document d = new Document();
        d.append("id", id);
        d.append("comment", comment);
        d.append("timestamp", new Date().getTime());

        Document inserted = template.insert(d, "comments");

        return inserted.getObjectId("_id").toString();
    }
    
}
