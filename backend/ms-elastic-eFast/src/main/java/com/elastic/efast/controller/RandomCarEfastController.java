package com.elastic.efast.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.efast.dto.ResponseCitiesDTO;
import com.elastic.efast.entity.V3EfastEntityLowercase;
import com.elastic.efast.service.RandomCarEfastService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RequestMapping("/api/efast/v1")
@RestController
@Tag(name = "Car API", description = "Documentation for generate random Cars")
public class RandomCarEfastController {

	@Autowired
	private RandomCarEfastService carServiceEfast;

	@Operation(summary = " Generador de vehiculos aleatorios. ", description = " Genera tantos vehiculos como se detalle(en el for)  para el índice detallado(indexName)", tags = {})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseCitiesDTO.class))) })
	@ResponseStatus(HttpStatus.OK)
	@GetMapping(value = "/random-collection-efast", produces = MediaType.APPLICATION_JSON_VALUE)
	public String randomCarArrayEfast() {
		var listEntities = new ArrayList<V3EfastEntityLowercase>();

		for (int i = 0; i < 10000; i++) { // poner tantos como vehiculos quieran generarse 50, 10000 ...
			listEntities.add(carServiceEfast.generateCar());
		}

		ObjectMapper objectMapper = new ObjectMapper();
		StringBuilder result = new StringBuilder();
		int idCounter = 1; // Variable para incrementar el ID
		for (V3EfastEntityLowercase entity : listEntities) {
			// index donde insertar
			String indexName = String
					.format("{\"index\":{\"_index\":\"vehiculos-efast-random-collection\",\"_id\":\"%d\"}}", idCounter);
			try {
				String entityJson = objectMapper.writeValueAsString(entity);
				result.append(indexName).append("\n").append(entityJson).append("\n");
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				System.out.println(e.toString());
			}
			idCounter++;
		}

		return result.toString();
	}

}
