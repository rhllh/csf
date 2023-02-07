package com.vttp2022.day36ws2.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttp2022.day36ws2.server.models.Comment;
import com.vttp2022.day36ws2.server.models.Game;
import com.vttp2022.day36ws2.server.repository.BGGRepository;

@Service
public class BGGService {
    
    @Autowired
    private BGGRepository repo;

    public Optional<List<Game>> getGames() {
        return repo.getGames();
    }

    public Optional<List<Comment>> getCommentsByGID(int gid) {
        return repo.getCommentByGID(gid);
    }
}
