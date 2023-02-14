package com.vttp2022.day37ws.server.repository;

import static com.vttp2022.day37ws.server.repository.Queries.SQL_GET_IMAGE;
import static com.vttp2022.day37ws.server.repository.Queries.SQL_GET_POST;
import static com.vttp2022.day37ws.server.repository.Queries.SQL_POST_TO_FEED;

import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day37ws.server.model.FileData;
import com.vttp2022.day37ws.server.model.PostDetails;

@Repository
public class FeedRepo {
    
    @Autowired
    private JdbcTemplate template;

    public boolean postToFeed(String postId, String comments, MultipartFile pic) throws IOException {

        System.out.println("in repo - post");

        InputStream is = pic.getInputStream();
        int updated = template.update(SQL_POST_TO_FEED, postId, comments, is);
        System.out.println(updated);

        // is.close();

        return updated > 0;
    }

    public Optional<FileData> getPicFromFeed(String postId) {

        String sql = SQL_GET_IMAGE.replace("?", "'%s'".formatted(postId));

        return template.query(sql, (ResultSet rs) -> {
            if (!rs.next()) return Optional.empty();

            FileData f = new FileData();
            f.setPicture(rs.getBytes("picture"));
            return Optional.of(f);
        });
        
    }

    public Optional<PostDetails> getPostFromFeed(String postId) {

        final SqlRowSet rs = template.queryForRowSet(SQL_GET_POST, postId);

        if (!rs.next()) return Optional.empty();

        PostDetails pd = new PostDetails();
        pd.setPostId(postId);
        pd.setComments(rs.getString("comments"));

        return Optional.of(pd);
    }
}
