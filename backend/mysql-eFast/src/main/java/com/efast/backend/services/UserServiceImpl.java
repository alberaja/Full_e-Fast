package com.efast.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efast.backend.model.Conductor;
import com.efast.backend.repository.ConductorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ConductorRepository userRepository;

    public List<Conductor> getAllUsers() {
        return userRepository.findAll();
    }

    public Conductor getConductorById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + userId));
    }

    public Conductor createUser(Conductor user) {
        return userRepository.save(user);
    }

    public Conductor updateUser(Long userId, Conductor user) {
    	
    	Conductor existingUser = getConductorById(userId);
        existingUser.setNombre(user.getNombre());
        existingUser.setApellidos(user.getApellidos());
        // TODO: resto campos
//        existingUser.setUserEmail(user.getUserEmail());
//        existingUser.setUserPassword(user.getUserPassword());
//        existingUser.setUserPhone(user.getUserPhone());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
//    public Long login(Conductor user) {
//    	Conductor existingUser = userRepository.findByUserEmail(user.getEmail());
//        if (existingUser != null && existingUser.getUserPassword().equals(user.getUserPassword())) {
//            return existingUser.getUserId();
//        }
//        return null;
//    }

	@Override
	public Optional<Conductor> getUserById(Long userId) {
		return userRepository.findById(userId);
	}

	@Override
	public Long login(Conductor user) {
		// TODO Auto-generated method stub
		return null;
	}

}
