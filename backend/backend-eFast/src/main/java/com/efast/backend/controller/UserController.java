package com.efast.backend.controller;

import java.util.List;

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

import com.efast.backend.model.Usuario;
import com.efast.backend.services.UserService;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*" )
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<Usuario> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public Usuario getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("")
    public Usuario createUser(@RequestBody Usuario user) {
        return userService.createUser(user);
    }

    @PutMapping("/{userId}")
    public Usuario updateUser(@PathVariable Long userId, @RequestBody Usuario user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
    @PostMapping("/login")
    public Long login(@RequestBody Usuario user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario user) {
        return userService.createUser(user);
    }
}

