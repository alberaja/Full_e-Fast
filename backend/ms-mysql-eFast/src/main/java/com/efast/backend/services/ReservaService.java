package com.efast.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.efast.backend.dto.ReservaDTO;
import com.efast.backend.dto.ReservaRequest;
import com.efast.backend.model.Conductor;
import com.efast.backend.model.Reserva;

public interface ReservaService {
    List<Reserva> getAllReservas();
    Reserva getReservaById(Long reservaId);
    // old
    ResponseEntity<String> createReserva(List<Reserva> reserva);
    // uso este
    void crearReserva(ReservaRequest reserva);
    List<Reserva> getReservasByUserId(Conductor userId); //Long
    
    ReservaDTO /*Reserva*/ crearReserva1 (ReservaRequest reservaDTO);
}