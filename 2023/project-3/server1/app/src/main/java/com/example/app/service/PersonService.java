package com.example.app.service;

import com.example.app.dao.Person;
import com.example.app.repository.PersonsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonsRepository personsRepository;

    public PersonService(PersonsRepository personsRepository) {
        this.personsRepository = personsRepository;
    }
    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    };
    public Person create(Person person) {
        return personsRepository.save(person);
    };
    public Person getPerson(long id) {
        return personsRepository.findById(id).orElse(null);
    };
}
