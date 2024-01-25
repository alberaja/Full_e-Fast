package com.efast.backend.services;

import java.util.List;

import com.efast.backend.model.Usuario;

public interface UserService {
	List<Usuario> getAllUsers();
	Usuario getUserById(Long userId);
	Usuario createUser(Usuario user);
	Usuario updateUser(Long userId, Usuario user);
	void deleteUser(Long userId);
	Long login(Usuario user);
}
