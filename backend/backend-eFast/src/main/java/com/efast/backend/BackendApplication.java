package com.efast.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.annotation.PostConstruct;
import com.efast.backend.model.Vehiculo;
import com.efast.backend.repository.VehiculoRepository;

@CrossOrigin(origins = "*" )

@EnableJpaRepositories(basePackages = "com.efast.backend.repository")
@SpringBootApplication
public class BackendApplication {
	
	@Autowired
	private VehiculoRepository vehiculoRepository;
	
	static final String URL = "URL del coche"; 
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostConstruct
    public void addVehicles(){
		System.out.println("entraa addVehicles");
		Vehiculo vehiculo = new Vehiculo();
			
		
		//vehiculo.setVehicleId(0L);  //se añade automaticamente
	    	vehiculo.setVehicleName("cocheAja1-Prueba");
	    	vehiculo.setVehicleDescription("Descrip cocheAja1");
	    	vehiculo.setPrice(50);
		vehiculo.setImageURI(URL);
	    	vehiculo.setQuantity(5);
		//vehiculo.setStartDate( LocalDateTime.parse("2020-06-14-00.00.00", DateTimeFormatter.ofPattern("yyy-MM-dd-HH.mm.ss")));
		//vehiculo.setEndDate( LocalDateTime.parse("2020-12-31-23.59.59", DateTimeFormatter.ofPattern("yyy-MM-dd-HH.mm.ss")));				
		vehiculoRepository.save(vehiculo);
    }
}
