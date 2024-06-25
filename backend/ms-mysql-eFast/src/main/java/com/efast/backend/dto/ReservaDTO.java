package com.efast.backend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReservaDTO {

//    private Reserva reserva;

	private Long vehiculoId;
	private String vehiculoMarcaModelo;
	private Long conductorId;
	private String comentarios;
	private String fechaHoraIni; // Timestamp
	private String fechaHoraFin;
	private String ciudadesVehiculo;
	private String ciudadesDevolverVehiculo;
	private Integer numeroDias;
	private Double precioPorDia;
	private Double totalReserva;
	 private Date lastUpdated;

}
