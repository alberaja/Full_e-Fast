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
    public List<Reserva> getAllOrders() {
        return reservaService.getAllReservas();
    }

    @GetMapping("/{orderId}")
    public Reserva getOrderById(@PathVariable Long orderId) {
        return reservaService.getReservaById(orderId);
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody List<Reserva> order) {
    	System.out.println(order.toString());
        return reservaService.createReserva(order);
    }
    
    @GetMapping("/user/{userId}")
    public List<Reserva> getOrdersByUserId(@PathVariable Long userId) {
        return reservaService.getReservasByUserId(userId);
    }
}
