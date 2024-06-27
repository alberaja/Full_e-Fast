package com.efast.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efast.backend.dto.ReservaDTO;
import com.efast.backend.dto.ReservaRequest;
import com.efast.backend.model.Conductor;
import com.efast.backend.model.Reserva;
import com.efast.backend.services.ReservaService;

@RestController
@RequestMapping("/api/efast/v1/reservas")
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

//    @PostMapping
//    public void createReserva(@RequestBody ReservaRequest reserva) {
//    	System.out.println(reserva.toString());
//        reservaService.crearReserva(reserva);
//    }
    
    @PostMapping
    public ResponseEntity<ReservaDTO> /*Reserva*/ crearReserva(@RequestBody ReservaRequest reservaDTO) {
    	System.out.println("NEW BOOKING : "+ reservaDTO.toString() );
    	return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.crearReserva1(reservaDTO)); 
    }
    
//    @PostMapping
//    public ResponseEntity<String> createReserva(@RequestBody List<Reserva> reserva) {
//    	System.out.println(reserva.toString());
//        return reservaService.createReserva(reserva);
//    }
    
    @GetMapping("/user/{userId}")
    public List<Reserva> getReservasByUserId(@PathVariable Conductor userId) { //Long valor del entity Reserva
        return reservaService.getReservasByUserId(userId);
    }
}
