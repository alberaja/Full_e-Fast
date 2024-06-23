package com.enviomails.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailyReservaRequest {

	// formulario de contacto
    private String nombre;
    private String email;
    private int telefono;
    private String comentarios;
    
    // para la Reserva
//    private Reserva reserva;
//    private Conductor conductor;
    private boolean esReserva;
}
