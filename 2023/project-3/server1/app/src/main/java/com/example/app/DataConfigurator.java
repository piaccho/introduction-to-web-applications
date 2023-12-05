package com.example.app;

import com.example.app.dao.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.app.repository.PersonsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataConfigurator {
    private static final Logger log = LoggerFactory.getLogger(DataConfigurator.class);

    @Bean
    CommandLineRunner commandLineRunner(PersonsRepository personRepository) {
        return args -> {
            personRepository.save(new Person("John", "Doe", "IT"));
            personRepository.save(new Person("Jan", "Kowalski", "BE Dev"));
            personRepository.save(new Person("Piotr", "Nowak", "FE Dev"));
            log.info("Persons found with findAll():");
            log.info("-------------------------------");
            personRepository.findAll().forEach(customer -> {
                log.info(customer.toString());
            });
        };
    }
}