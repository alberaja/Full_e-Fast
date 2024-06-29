package com.efast.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efast.backend.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
//	List<Reserva> findByUser(Conductor user); //(Usuario userId);
	
	Optional<Reserva> findByVehiculoId(Long vehiculoId);
}
