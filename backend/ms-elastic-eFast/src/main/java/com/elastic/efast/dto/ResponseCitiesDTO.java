package com.elastic.efast.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseCitiesDTO /* implements Serializable */ {

	// private static final long serialVersionUID = 1L;

	// @JsonProperty("shipId")
	//private Integer id;

	// @JsonProperty("shipName")
//	@NotNull
//	@NotBlank
//	@Size(max = 20)
//	private String name;

	//private List<List<String>> cities;
	private Set<String> ciudadesUnicas; //uniqueCitis;
	
	//private List<String> citisVehiculo; 
	
	//private ArrayList<String> ciudadesVehiculo;

//	public List<List<String>> getCities() {
//		return cities;
//	}
//
//	public void setCities(List<List<String>> cities) {
//		this.cities = cities;
//	}
}
