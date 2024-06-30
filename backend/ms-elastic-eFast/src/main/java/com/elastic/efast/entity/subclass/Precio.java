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
public class Precio {
	@Field(name = "Por1DiaEuros", type = FieldType.Integer)
	private int por1DiaEuros;

	@Field(name = "CancelacionGratis", type = FieldType.Boolean)
	private boolean cancelacionGratis;

	@Field(name = "OfertaEspecial", type = FieldType.Boolean)
	private boolean ofertaEspecial;

	@Field(name = "PrecioOferta", type = FieldType.Integer)
	private int precioOferta;
}