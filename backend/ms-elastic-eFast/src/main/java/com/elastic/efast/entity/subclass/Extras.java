package com.elastic.efast.entity.subclass;

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
//@JsonNaming(value = PropertyNamingStrategies.UpperCamelCaseStrategy.class)
public class Extras {
	@Field(name = "GPS", type = FieldType.Boolean)
	private boolean gps;

	@Field(name = "SillaBebe", type = FieldType.Boolean)
	private boolean sillaBebe;

	@Field(name = "ProteccionenCarretera", type = FieldType.Boolean)
	private boolean proteccionenCarretera;

	@Field(name = "ExenciondeFranquicia", type = FieldType.Integer)
	private int exenciondeFranquicia;

	@Field(name = "OpcionSeguroTodoRiesgo", type = FieldType.Boolean)
	private boolean opcionSeguroTodoRiesgo;
}