package com.elastic.efast.service;

import java.util.Map;

import com.elastic.efast.dto.ResponseCitiesDTO;

public interface IndexService {
	
	Map<String, Object> getTiposMarcas();
	
	Map<String, Object> getTiposVehiculos();
	
	ResponseCitiesDTO getCiudades(String nombre, boolean ciudadesDevolverVehiculos);
	
	ResponseCitiesDTO getCiudadesVehiculo();
	
	ResponseCitiesDTO getCiudadesDevolverVehiculos(String nombreCiudadesVehiculo);

}
