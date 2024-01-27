package com.efast.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efast.backend.model.Reserva;
import com.efast.backend.model.Usuario;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
	List<Reserva> findByUser(Usuario user); //(Usuario userId);
}
