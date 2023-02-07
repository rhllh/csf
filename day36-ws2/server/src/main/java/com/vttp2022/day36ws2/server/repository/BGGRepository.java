package com.vttp2022.day36ws2.server.repository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.vttp2022.day36ws2.server.models.Comment;
import com.vttp2022.day36ws2.server.models.Game;

@Repository
public class BGGRepository {

    @Autowired
    private MongoTemplate template;

    public Optional<List<Game>> getGames() {

        List<Document> result = template.find(new Query().limit(10), Document.class, "games");
        if (result.isEmpty()) return Optional.empty();
        
        List<Game> games = new LinkedList<>();
        for (Document d : result) {
            Game g = Game.create(d);
            games.add(g);
        }

        return Optional.of(games);
    }

    public Optional<List<Comment>> getCommentByGID(int gid) {

        List<Document> result = template.find(Query.query(Criteria.where("gid").is(gid)), Document.class, "comments");

        if (result.isEmpty()) return Optional.empty();

        List<Comment> comments = new LinkedList<>();
        for (Document d : result) {
            Comment c = Comment.create(d);
            comments.add(c);
        }

        return Optional.of(comments);
    }
    
}
