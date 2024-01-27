package com.efast.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.efast.backend.model.Reserva;
import com.efast.backend.model.Usuario;

public interface ReservaService {
    List<Reserva> getAllReservas();
    Reserva getReservaById(Long reservaId);
    ResponseEntity<String> createReserva(List<Reserva> reserva);
    List<Reserva> getReservasByUserId(Usuario userId); //Long
}