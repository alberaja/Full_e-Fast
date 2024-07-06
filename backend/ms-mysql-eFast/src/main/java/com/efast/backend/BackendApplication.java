package com.efast.backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.efast.backend.model.Vehiculo;
import com.efast.backend.repository.VehiculoRepository;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*" )

@EnableJpaRepositories(basePackages = "com.efast.backend.repository")
@SpringBootApplication
@Slf4j
public class BackendApplication {
	
	@Autowired
	private VehiculoRepository vehiculoRepository;
	
	static final String URL = "URL del coche"; 
	
	List<String> CAR_NAMES  = new ArrayList<>();//List.of("Ford Mustang Mach-E", "Vespa Elettrica", "Hyundai Ioniq 6", "Kia Soul EV", "Ford Mustang Mach-E");
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	// Descomentar la primera vez. comentar luego para no duplique guardado con cada cambio realizado
	 @PostConstruct
    public void addVehicles(){
		log.info("entraa addVehicles");
		initializeVehicles();
		// insertar 4 vehiculos de prueba
		for (int i = 0; i < CAR_NAMES.size(); i++) {
			Vehiculo vehiculo = new Vehiculo();
		//vehiculo.setVehicleId(0L);  //se añade automaticamente	
			vehiculo.setVehiculo_id(i+1L); // asegurar siempre =orden
			vehiculo.setAlquilable(true);
	    	vehiculo.setVehicleName(CAR_NAMES.get(i));
	    	vehiculo.setVehicleDescription("Vehiculo muy cómodo, rápido y veloz");
	    	vehiculo.setPrice(55.0);
	    	vehiculo.setImageURI(URL);
	    	vehiculo.setQuantity(1);
		//vehiculo.setStartDate( LocalDateTime.parse("2020-06-14-00.00.00", DateTimeFormatter.ofPattern("yyy-MM-dd-HH.mm.ss")));
		//vehiculo.setEndDate( LocalDateTime.parse("2020-12-31-23.59.59", DateTimeFormatter.ofPattern("yyy-MM-dd-HH.mm.ss")));				
		vehiculoRepository.save(vehiculo);
		
		}
    }

	private void initializeVehicles() {
		// 50 primeros vehiculos
		 CAR_NAMES.add("Ford Mustang Mach-E");
	        CAR_NAMES.add("Vespa Elettrica");
	        CAR_NAMES.add("Hyundai Ioniq 6");
	        CAR_NAMES.add("Kia Soul EV");
	        CAR_NAMES.add("Ford Mustang Mach-E");
	        
	        CAR_NAMES.add("Honda PCX Electric");
	        CAR_NAMES.add("Energica Eva Ribelle");
	        CAR_NAMES.add("BMW CE 04");
	        CAR_NAMES.add("Vespa Elettrica");
	        CAR_NAMES.add("BMW i3");
	        CAR_NAMES.add("Audi e-tron GT");
	        CAR_NAMES.add("Energica EsseEsse9");
	        CAR_NAMES.add("Audi e-tron");
	        CAR_NAMES.add("Ford Mustang Mach-E");
	        CAR_NAMES.add("KTM Freeride E-XC");
	        CAR_NAMES.add("Nissan Leaf");
	        CAR_NAMES.add("Ducati Super Soco TC");
	        CAR_NAMES.add("Zero FX");
	        CAR_NAMES.add("Honda PCX Electric");
	        CAR_NAMES.add("Volkswagen ID. Buzz");
	        CAR_NAMES.add("Chevrolet Bolt EV");
	        CAR_NAMES.add("Harley-Davidson LiveWire");
	        CAR_NAMES.add("Chevrolet");
	        CAR_NAMES.add("Audi");
	        CAR_NAMES.add("Zero SR/S");
	        CAR_NAMES.add("Harley-Davidson LiveWire");
	        CAR_NAMES.add("Yamaha EC-03");
	        CAR_NAMES.add("Yamaha EC-03");
	        CAR_NAMES.add("Nissan Ariya");
	        CAR_NAMES.add("Vespa Elettrica");
	        CAR_NAMES.add("Ducati Super Soco TC");
	        CAR_NAMES.add("Harley-Davidson LiveWire");
	        CAR_NAMES.add("BMW iX");
	        CAR_NAMES.add("KTM Freeride E-XC");
	        CAR_NAMES.add("Ducati Super Soco TC");
	        CAR_NAMES.add("Nissan Ariya");
	        CAR_NAMES.add("Lightning LS-218");
	        CAR_NAMES.add("Zero FX");
	        CAR_NAMES.add("Zero SR/S");
	        CAR_NAMES.add("Yamaha EC-03");
	        CAR_NAMES.add("Harley-Davidson LiveWire");
	        CAR_NAMES.add("Harley-Davidson LiveWire");
	        CAR_NAMES.add("Ducati Super Soco TC");
	        CAR_NAMES.add("Honda PCX Electric");
	        CAR_NAMES.add("Vespa Elettrica");
	        CAR_NAMES.add("Audi e-tron GT");
	        CAR_NAMES.add("Energica EsseEsse9");
	        CAR_NAMES.add("Vespa Elettrica");
	        CAR_NAMES.add("Energica");
	        CAR_NAMES.add("Yamaha EC-03");
	}
}
