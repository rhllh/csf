package com.vttp2022.day36.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vttp2022.day36.server.models.Book;
import com.vttp2022.day36.server.service.BookService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@Controller
@RequestMapping(path="/api")
public class BookController {

    @Autowired
    private BookService svc;
    
    @GetMapping("/books")
    @ResponseBody
    public ResponseEntity<String> getBooks() {
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        svc.getBooks().stream().forEach(v -> {
            arrBuilder.add(v.toBookSummary());
        });

        return ResponseEntity.ok(arrBuilder.build().toString());
    }

    @GetMapping("/book/{id}")
    @ResponseBody
    public ResponseEntity<String> getBookById(@PathVariable String id) {
        Optional<Book> opt = svc.getBook(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(
                Json.createObjectBuilder()
                    .add("message", "Cannot find book id %s".formatted(id))
                    .build().toString()
            );
        } else {
            return ResponseEntity.status(200).body(
                opt.get().toBook().toString()
            );
        }
    }

}
