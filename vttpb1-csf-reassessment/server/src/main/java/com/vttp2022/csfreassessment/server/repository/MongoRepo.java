package com.vttp2022.csfreassessment.server.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.vttp2022.csfreassessment.server.model.Listing;

@Repository
public class MongoRepo {
    
    @Autowired
    private MongoTemplate template;

    public void insertListing(Listing li) {
        Document toInsert = li.toDocument();

        template.insert(toInsert, "postings");
    }
}
