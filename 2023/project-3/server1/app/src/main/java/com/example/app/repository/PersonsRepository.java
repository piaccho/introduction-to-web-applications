package com.example.app.repository;

import com.example.app.dao.Person;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonsRepository extends CrudRepository<Person, Long> {

}
