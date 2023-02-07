package com.vttp2022.day36.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttp2022.day36.server.models.Book;
import com.vttp2022.day36.server.repository.BookRepository;

@Service
public class BookService {
    
    @Autowired
    private BookRepository repo;

    public List<Book> getBooks() {
        return repo.getBooks();
    }

    public Optional<Book> getBook(String bookId) {
        return repo.getBook(bookId);
    }
}
