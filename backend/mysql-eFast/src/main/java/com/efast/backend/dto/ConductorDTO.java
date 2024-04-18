package com.efast.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ConductorDTO {

	private String nombre;
	private String apellidos;
	private String dni;
	private int telefono;
	private String email;

}
