package com.efast.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.efast.backend.model.Reserva;
import com.efast.backend.model.Usuario;
import com.efast.backend.model.Vehiculo;
import com.efast.backend.repository.ReservaRepository;
import com.efast.backend.repository.VehiculoRepository;
import com.efast.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReservaServiceImpl implements ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehiculoRepository productRepository;

    @Override
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    @Override
    public Reserva getReservaById(Long reservaId) {
        return reservaRepository.findById(reservaId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva not found with id: " + reservaId));
    }

    @Override
    public ResponseEntity<String> createReserva(List<Reserva> reserva){
    	
    	
    	System.out.println("reserva");
    	System.out.println(reserva	);
    	for(Reserva o : reserva) {
    		
	    	// Check if user is not null and has a valid ID
	       // if (o.getUser() == null || o.getUser().getId() == null) {
	        //    return ResponseEntity.badRequest().body("User is required");
	        //}

	        // Check if product is not null and has a valid ID
	        //if (o.getProduct() == null || o.getProduct().getProductId() == null) {
	         //   return ResponseEntity.badRequest().body("Product is required");
	        //}
	        
    		reservaRepository.save(o);
	        
    	}
		/*
		 * User user = userRepository.findById(order.getUser().getId()).orElseThrow();
		 * Product product =
		 * productRepository.findById(order.getProduct().getProductId()).orElseThrow();
		 */

//        Order newOrder = new Order();
//        newOrder.setUser(user);
//        newOrder.setProduct(product);
        return ResponseEntity.ok("Reserva creada successfully");
    }

    @Override
    public List<Reserva> getReservasByUserId(Long userId) {
        return reservaRepository.findByUserId(userId);
    }
}
