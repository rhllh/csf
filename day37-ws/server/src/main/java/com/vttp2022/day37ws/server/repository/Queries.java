package com.vttp2022.day37ws.server.repository;

public class Queries {
    
    public static final String SQL_POST_TO_FEED = "insert into posts(post_id, comments, picture) values(?, ?, ?)";

    public static final String SQL_GET_POST = "select comments from posts where post_id = ?";

    public static final String SQL_GET_IMAGE = "select picture from posts where post_id = ?";
}
