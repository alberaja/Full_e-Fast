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
@JsonNaming(value = PropertyNamingStrategies.UpperCamelCaseStrategy.class)
public class Seguro {
	@Field(name = "CoberturaParcialcolisionFranquiciaQty", type = FieldType.Integer)
	private int coberturaParcialcolisionFranquiciaQty;

	@Field(name = "CoberturaParcialcolisionFranquicia", type = FieldType.Boolean)
	private boolean coberturaParcialcolisionFranquicia;

	@Field(name = "CoberturaRobo", type = FieldType.Boolean)
	private boolean coberturaRobo;

	@Field(name = "CoberturaRobocolisionFranquiciaQty", type = FieldType.Integer)
	private int CoberturaRobocolisionFranquiciaQty;
	
}