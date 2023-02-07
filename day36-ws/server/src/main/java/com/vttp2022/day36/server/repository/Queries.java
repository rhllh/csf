package com.vttp2022.day36.server.repository;

public class Queries {
    
    public static final String SQL_SELECT_BOOKS = "select * from book2018 limit 20";

    public static final String SQL_SELECT_BY_ID = "select * from book2018 where book_id = ?";
}
