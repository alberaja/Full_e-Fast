package com.elastic.efast.service;

import java.util.List;

public interface AggregationsService {
	
	Object findVehiculosAggregates(Integer idVehiculo, List<String> cajasCambio, List<String> tiposElectrico,
			List<String> tiposVehiculo, List<Integer> numPlazasMin, String maximoKmStr, Long maximoKm,
			List<String> marcasVehiculo, String ciudadVehiculo, String ciudadDevolverVehiculo, String fechaHoraIni,
			String fechaHoraFin, int page);
}
