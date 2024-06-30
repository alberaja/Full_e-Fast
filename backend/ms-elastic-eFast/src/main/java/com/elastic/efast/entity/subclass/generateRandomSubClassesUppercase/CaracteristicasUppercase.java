package com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.UpperCamelCaseStrategy.class) //<--- para generar con formato AutonomiaKm
public class CaracteristicasUppercase {

	@Field(name = "AutonomiaKm", type = FieldType.Integer)
	private long  autonomiaKm;  // int

	@Field(name = "Año", type = FieldType.Integer)
	private int año;

	@Field(name = "CajaCambio", type = FieldType.Keyword)
	private String cajaCambio;

	@Field(name = "Descripcion", type = FieldType.Text)
	private String descripcion;

	@Field(name = "EtiquetaECO", type = FieldType.Boolean)
	private boolean etiquetaECO;

	@Field(name = "Litros", type = FieldType.Integer)
	private int litros;

	@Field(name = "MaximodeKm", type = FieldType.Long)
	private long maximodeKm;

	@Field(name = "NumeroBolsasmaletero", type = FieldType.Integer)
	private int numeroBolsasmaletero;

	@Field(name = "NumPlazas", type = FieldType.Integer)
	private int numPlazas; // numplazas

	@Field(name = "TipoVehiculo", type = FieldType.Text)
	private String tipoVehiculo;
	
//	nuevos campos
	@Field(name = "AltoConfort", type = FieldType.Boolean)
	private boolean altoConfort;
	
	@Field(name = "AltasPrestaciones", type = FieldType.Boolean)
	private boolean altasPrestaciones;
	
	@Field(name = "PerfectoEstado", type = FieldType.Boolean)
	private boolean perfectoEstado;
}
