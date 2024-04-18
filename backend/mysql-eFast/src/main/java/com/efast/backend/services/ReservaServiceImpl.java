package com.efast.backend.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.efast.backend.dto.ConductorDTO;
import com.efast.backend.dto.ReservaDTO;
import com.efast.backend.dto.ReservaRequest;
import com.efast.backend.model.Conductor;
import com.efast.backend.model.Reserva;
import com.efast.backend.model.Vehiculo;
import com.efast.backend.repository.ConductorRepository;
import com.efast.backend.repository.ReservaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReservaServiceImpl implements ReservaService {
	@Autowired
	private ReservaRepository reservaRepository;

	@Autowired
	private ConductorRepository conductorRepository;

	private final ModelMapper modelMapper = new ModelMapper();

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
	public ResponseEntity<String> createReserva(List<Reserva> reserva) {

		System.out.println("reserva");
		System.out.println(reserva);
		for (Reserva o : reserva) {

			// Check if user is not null and has a valid ID
			// if (o.getUser() == null || o.getUser().getId() == null) {
			// return ResponseEntity.badRequest().body("User is required");
			// }

			// Check if product is not null and has a valid ID
			// if (o.getProduct() == null || o.getProduct().getProductId() == null) {
			// return ResponseEntity.badRequest().body("Product is required");
			// }

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
	public List<Reserva> getReservasByUserId(Conductor userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void crearReserva(ReservaRequest reservaRequest) {
//		Reserva reserva = reservaRequest.getReserva();
//		Conductor conductor = reservaRequest.getConductor();
//
//		// Asignar el conductor a la reserva
//		reserva.setConductor(conductor);
//
//		// Guardar la reserva en la base de datos
//		reservaRepository.save(reserva);
//
//		// validar si conductor ya existe
//		Optional<Conductor> checkConductor = conductorRepository.findByDni(conductor.getDni());
//		// userServiceImpl.getUserById(reservaRequest.getReserva().getConductor().getConductorId());
//		if (!checkConductor.isPresent()) {
//			conductorRepository.save(conductor);
//		}

	}

//    @Override
//    public List<Reserva> getReservasByUserId(Conductor userId) { //Long
//        return reservaRepository.findByUser(userId);
//    }

	public ReservaDTO crearReserva1(ReservaRequest reservaRequest) {
		// 1. Crear o recuperar el conductor
		
//		ConductorDTO conductReserva = modelMapper.map(reservaRequest.getReserva().getConductorId(), ConductorDTO.class);
		Conductor conductor = obtenerOCrearConductor(reservaRequest.getConductor());

		// 3. Crear la reserva
		Reserva reserva = new Reserva();
		reserva.setConductorId(conductor ); //new Conductor()    setConductorId(conductor.getConductorId().getLong(""));
		// 2. Crear o recuperar el vehículo                      // otrasCaracteristicas como nombre, precio..
		Vehiculo vehiculo = Vehiculo.builder().vehiculo_id(reservaRequest.getReserva().getVehiculoId()).vehicleName("otrasCaracteristicas").price(55).build();
		// Verificar si la reserva existe en la base de datos
		reserva.setVehiculoId(null);  // ok la 1era vez con null, luego va ok con la vble vehiculo
		
		reserva.setFechaHoraIni(reservaRequest.getReserva().getFechaHoraIni());
		reserva.setFechaHoraFin(reservaRequest.getReserva().getFechaHoraFin());
		reserva.setCiudadesVehiculo(reservaRequest.getReserva().getCiudadesDevolverVehiculo());
		reserva.setCiudadesDevolverVehiculo(reservaRequest.getReserva().getCiudadesDevolverVehiculo());
		reserva.setNumeroDias(reservaRequest.getReserva().getNumeroDias());
		reserva.setPrecioPorDia(reservaRequest.getReserva().getPrecioPorDia());
		reserva.setTotalReserva(reservaRequest.getReserva().getTotalReserva());
		reserva.setComentarios(reservaRequest.getReserva().getComentarios());

		// 4. Guardar la reserva
		reservaRepository.save(reserva);

		
		// 5. Devolver la reserva
		ReservaDTO reservaResponse = modelMapper.map(reserva, ReservaDTO.class);
		return reservaResponse;
		// reserva;
	}
	
	 private Conductor obtenerOCrearConductor(ConductorDTO conductorDTO) {
	        Conductor conductor = conductorRepository.findByDni(conductorDTO.getDni()).orElse(null);

	        if (conductor == null) { // conductor == null
	            Conductor conductorNuevo = new Conductor();
	            conductorNuevo.setNombre(conductorDTO.getNombre());
	            conductorNuevo.setApellidos(conductorDTO.getApellidos());
	            conductorNuevo.setDni(conductorDTO.getDni());
	            conductorNuevo.setTelefono(conductorDTO.getTelefono());
	            conductorNuevo.setEmail(conductorDTO.getEmail());
	            conductorRepository.save(conductorNuevo);		// conductorRepository.saveAndFlush()
	            return conductorNuevo;
	        } 
	        
			return conductor;
	    }

}
