package com.vttp2022.day36.server.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Book {
    private String bookId;
    private String title;
    private String authors;
    private String description;

    public String getBookId() {
        return bookId;
    }
    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthors() {
        return authors;
    }
    public void setAuthors(String authors) {
        this.authors = authors;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public static Book create(SqlRowSet rs) {
        Book b = new Book();
        b.title = rs.getString("title");
        b.bookId = rs.getString("book_id");
        b.authors = rs.getString("authors");
        b.description = rs.getString("description");

        return b;
    }

    public JsonObject toBookSummary() {
        return Json.createObjectBuilder()
                    .add("bookId", bookId)
                    .add("title", title)
                    .add("authors", authors)
                    .add("description", description)
                    .build();
    }

    public JsonObject toBook() {
        return Json.createObjectBuilder()
                .add("title", title)
                .add("authors", authors)
                .add("description", description)
                .build();
    }
}

