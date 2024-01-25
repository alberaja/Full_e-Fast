package com.efast.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efast.backend.model.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
	Usuario findByUserEmail(String userEmail);
}
