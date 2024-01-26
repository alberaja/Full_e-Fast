package com.efast.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efast.backend.model.Reserva;
import com.efast.backend.services.ReservaService;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*" )
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaService.getAllReservas();
    }

    @GetMapping("/{reservaId}")
    public Reserva getReservaById(@PathVariable Long reservaId) {
        return reservaService.getReservaById(reservaId);
    }

    @PostMapping
    public ResponseEntity<String> createReserva(@RequestBody List<Reserva> reserva) {
    	System.out.println(reserva.toString());
        return reservaService.createReserva(reserva);
    }
    
    @GetMapping("/user/{userId}")
    public List<Reserva> getReservasByUserId(@PathVariable Long userId) {
        return reservaService.getReservasByUserId(userId);
    }
}
