package com.efast.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efast.backend.model.Conductor;

@Repository
public interface ConductorRepository extends JpaRepository<Conductor, Long> {
//	ok Conductor findByUserEmail(String userEmail);
	Optional<Conductor> findByDni(String dni);
}
