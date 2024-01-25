package com.efast.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efast.backend.model.Usuario;
import com.efast.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public List<Usuario> getAllUsers() {
        return userRepository.findAll();
    }

    public Usuario getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + userId));
    }

    public Usuario createUser(Usuario user) {
        return userRepository.save(user);
    }

    public Usuario updateUser(Long userId, Usuario user) {
    	
        Usuario existingUser = getUserById(userId);
        existingUser.setUserName(user.getUserName());
        existingUser.setUserEmail(user.getUserEmail());
        existingUser.setUserPassword(user.getUserPassword());
        existingUser.setUserPhone(user.getUserPhone());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    public Long login(Usuario user) {
        Usuario existingUser = userRepository.findByUserEmail(user.getUserEmail());
        if (existingUser != null && existingUser.getUserPassword().equals(user.getUserPassword())) {
            return existingUser.getId();
        }
        return null;
    }

}
