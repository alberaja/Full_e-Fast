package com.efast.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.efast.backend.model.Reserva;

public interface ReservaService {
    List<Reserva> getAllReservas();
    Reserva getReservaById(Long reservaId);
    ResponseEntity<String> createReserva(List<Reserva> reserva);
    List<Reserva> getReservasByUserId(Long userId);
}