package com.green_india.controller;

import com.green_india.entity.EcoBadge;
import com.green_india.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{id}/badge")
    public EcoBadge getUserBadge(@PathVariable Integer id){
        return userRepository.findById(id).
                orElseThrow(()-> new RuntimeException("User not found")).getBadge();
    }

}
