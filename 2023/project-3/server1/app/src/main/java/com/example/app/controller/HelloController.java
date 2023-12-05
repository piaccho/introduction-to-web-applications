package com.example.app.controller;

import com.example.app.dao.Person;
import com.example.app.service.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HelloController {
    @GetMapping
    public ResponseEntity<ExampleData> greeting(@RequestParam String name) {
        ExampleData data = new ExampleData("Hello " + name + "!");
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Custom-Header", "200")
                .body(data);
    }
}

record ExampleData(String name) {
}
