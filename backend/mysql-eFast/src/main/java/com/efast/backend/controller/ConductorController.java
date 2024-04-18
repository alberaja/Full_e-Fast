package com.efast.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efast.backend.model.Conductor;
import com.efast.backend.repository.ConductorRepository;
import com.efast.backend.services.UserService;

@RestController
@RequestMapping("api/conductores")
@CrossOrigin(origins = "*" )
public class ConductorController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private ConductorRepository conductorRepository;

    @GetMapping("")
    public List<Conductor> getAllUsers() {
        return conductorRepository.findAll();//return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public Optional<Conductor> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("")
    public Conductor createUser(@RequestBody Conductor user) {
        return userService.createUser(user);
    }

    @PutMapping("/{userId}")
    public Conductor updateUser(@PathVariable Long userId, @RequestBody Conductor user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
    @PostMapping("/login")
    public Long login(@RequestBody Conductor user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    public Conductor register(@RequestBody Conductor user) {
        return userService.createUser(user);
    }
}

