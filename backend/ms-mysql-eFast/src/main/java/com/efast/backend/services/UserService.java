package com.efast.backend.services;

import java.util.List;
import java.util.Optional;

import com.efast.backend.model.Conductor;

public interface UserService {
	List<Conductor> getAllUsers();
	Optional<Conductor> getUserById(Long userId);
	Conductor createUser(Conductor user);
	Conductor updateUser(Long userId, Conductor user);
	void deleteUser(Long userId);
	Long login(Conductor user);
}
