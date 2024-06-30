package com.elastic.efast.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.efast.dto.EsClient.VehiculosQueryResponse;
import com.elastic.efast.service.AggregationsService;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "*", allowedHeaders = "*") // aja permitir ser llamado desde https://codesandbox.io/
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/efast/v1")
@Tag(name = "Aggregations API. UC-02+UC-03", description = "Documentation for Searching+Filtering menu eFast API")	
public class AggregationsController {

	@Autowired
	private AggregationsService aggregationsService;
	
	// opc: separar a 1 endpoint la respuesta del aggregate que ya se responde en
	// /filter-modal-2 =buscarVehiculos()=ElasticeFastController.java
	//@Operation(summary = " endpoint ", description = " Buscar(UC-02) y filtrar(UC-03) vehiculos disponibles en alquiler. ", tags = {})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = VehiculosQueryResponse.class))) })
	@ResponseStatus(HttpStatus.OK)
	@GetMapping(value = "/vehiculos", produces = MediaType.APPLICATION_JSON_VALUE)
	public Object findVehiculosAggregates( 
			//@RequestParam(defaultValue = "0", required = false) int pag, //page
			//@RequestParam(defaultValue = "10", required = false) int tam, //size
			@RequestParam(defaultValue = "1", required = false) int page, //Pagination
			@RequestParam(value = "tiposElectrico", required = false) List<String> tiposElectrico,
			@RequestParam(value = "tiposVehiculo", required = false) List<String> tiposVehiculo,
			@RequestParam(value = "cajaCambio", required = false) List<String> cajasCambio,
			@RequestParam(value = "numPlazas", required = false) List<Integer> numPlazasMin,
			@RequestParam(value = "maximoKm", required = false) Long maximoKm,
			@RequestParam(value = "maximoKmStr", required = false) String maximoKmStr,	
			@RequestParam(value = "idVehiculo", required = false) Integer idVehiculo
			,
			@RequestParam(value = "marcasVehiculo", required = false) List<String> marcasVehiculo,
			@RequestParam(value = "ciudadesVehiculo", required = false/*, defaultValue = ""defaultValue = "Madrid"*/) String ciudadVehiculo,
            @DateTimeFormat(pattern = "dd-MM-yyyyTHH:mm") @RequestParam(name = "fechaHoraIni", required = false/*true, defaultValue = "05-03-2024T07:00"*/) /*@NotBlank @NotEmpty*/ String fechaHoraIni,
            @DateTimeFormat(pattern = "dd-MM-yyyyTHH:mm") @RequestParam(name = "fechaHoraFin", required = false/*true, defaultValue = "08-03-2024T18:00"*/) /*@NotBlank @NotEmpty*/ String fechaHoraFin,
			@RequestParam(value = "ciudadesDevolverVehiculo", required = false) String ciudadDevolverVehiculo        
          // ,@RequestParam(required = false, defaultValue = "false") Boolean aggregate
	) { // = q maximoKm pero en String) {
		return aggregationsService.findVehiculosAggregates(idVehiculo, cajasCambio, tiposElectrico, tiposVehiculo, numPlazasMin,
				maximoKmStr, maximoKm, marcasVehiculo, ciudadVehiculo, ciudadDevolverVehiculo, fechaHoraIni,
				fechaHoraFin, page);

	}
	
}
