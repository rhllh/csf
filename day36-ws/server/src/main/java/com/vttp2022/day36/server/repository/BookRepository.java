package com.vttp2022.day36.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.vttp2022.day36.server.models.Book;

import static com.vttp2022.day36.server.repository.Queries.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class BookRepository {
    
    @Autowired
    private JdbcTemplate template;

    public List<Book> getBooks() {
        final SqlRowSet rs = template.queryForRowSet(SQL_SELECT_BOOKS);
        List<Book> results = new LinkedList<>();

        while (rs.next()) {
            results.add(Book.create(rs));
        }

        return results;
    }

    public Optional<Book> getBook(String bookId) {
        final SqlRowSet rs = template.queryForRowSet(SQL_SELECT_BY_ID, bookId);

        if (!rs.next()) {
            return Optional.empty();
        }

        Book b = Book.create(rs);

        return Optional.of(b);
    }
}
