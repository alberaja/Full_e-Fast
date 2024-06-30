package com.elastic.efast.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

//import org.apache.commons.text.similarity.LevenshteinDistance;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elastic.efast.dto.ResponseCitiesDTO;
import com.elastic.efast.dto.EsClient.VehiculosQueryResponse;
import com.elastic.efast.entity.V3EfastEntity;
import com.elastic.efast.service.IndexService;
import com.elastic.efast.util.Constantes;
import com.elastic.efast.util.TipoVehiculoEnum;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
//import AjaQueryStrategy.ElasticsearchService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*") // aja permitir ser llamado desde https://codesandbox.io/
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/efast/v1") // /index
@Tag(name = "Index API. UC-01", description = "/index. Documentation for Index endpoints eFast API")		// Para separar los controler en OpenAPi. Si es igual a otro Tag, no lo crea como un controller <>
public class IndexController {

//	@Autowired
//    private VehiculoService vehiculoService;

	private final ElasticsearchOperations elasticClient;

	@Autowired
	private IndexService indexService;

	// RF1.4 y RF1.5
	// mostrar y recorrer las propiedades del properties
	//	Valores desde BBDD ES: BrandTypes
	//	Valores desde FiltrosProperties: FuelTypes, CarTypes
	//@Operation(summary = "UC-01 ruta correcta: /api/efast/v1/props", description = " Recuperar las propiedades dinamicas del index", tags = {})
	//@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(type = "array", implementation = Map.class)))
	@ResponseStatus(HttpStatus.OK)
				 // old: /propiedades
	@GetMapping(value = "/tiposMarcasconAggregates", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> tiposMarcasconAggregates() {
		// Valores desde BBDD ES
		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder();

		// Agregar consulta
		nativeSearchQueryBuilder.withQuery(QueryBuilders.termQuery("Alquilable", "S"));

		// Agregar agregación
		nativeSearchQueryBuilder.addAggregation(
				AggregationBuilders.terms("tiposMarcas").field("MarcaVehiculo.keyword").size(50)//BrandTypes  //marcas_vehiculo_distinct
				// Tamaño máximo	 de la lista  de  resultados
		);

		// Establecer tamaño 0 para evitar recuperar documentos
		// nativeSearchQueryBuilder.withMaxResults(0); //withSize(0);

		// Construir consulta
		Query query = nativeSearchQueryBuilder.build();
		SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);

//		Map<String, Object> aggregates = new LinkedHashMap<>();
		List<Map<String, Object>> aggregates = new ArrayList<>();
		if (result.hasAggregations()) {
			Map<String, Aggregation> aggs = result.getAggregations().asMap();
			ParsedStringTerms marcasVehiculoElectricoAgg = (ParsedStringTerms) aggs.get("tiposMarcas"); //BrandTypes  // marcas_vehiculo_distinct

			List<Map<String, Object>> marcasVehiculos = new ArrayList<>();
			marcasVehiculoElectricoAgg.getBuckets().forEach(bucket -> {
				Map<String, Object> typeDetails = new LinkedHashMap<>();
				typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
				typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
				typeDetails.put(Constantes.VALOR, bucket.getKey().toString());
				marcasVehiculos.add(typeDetails);
			});

			// aggregates.add(Map.of("marcas_vehiculo_distinct", marcasVehiculos)); //si
			// fuera List<Map<String, Object>>
			aggregates.add(Map.of("tiposMarcas", marcasVehiculos)); //BrandTypes  //para Map<String, Object> aggregates:   aggregates.put("marcas_vehiculo_distinct", marcasVehiculos);
		}
//		return aggregates;
	
		
		// Valores desde FiltrosProperties: 
//		List<Map<String, Object>> aggregates = new ArrayList<>();

//		List<Map<String, Object>> fuelTypes = new ArrayList<>();
//		filtrosProp.getFuelTypes().forEach(fuelType -> {
//			Map<String, Object> typeDetails = new LinkedHashMap<>();
//			typeDetails.put(Constantes.VALOR, fuelType);
//			String tipoElectricoHuman = fromClave(fuelType);
//			typeDetails.put(Constantes.VALOR_HUMANO, tipoElectricoHuman);
//			fuelTypes.add(typeDetails);
//		});
//		aggregates.add(Map.of("tiposElectrico", fuelTypes)); //FuelTypes
//
//		List<Map<String, Object>> carTypes = new ArrayList<>();
//		filtrosProp.getCarTypes().forEach(carType -> {
//			Map<String, Object> typeDetails = new LinkedHashMap<>();
//			typeDetails.put(Constantes.VALOR, carType);//"value"
//			carTypes.add(typeDetails);
//		});
//		aggregates.add(Map.of("tiposVehiculo", carTypes)); //CarTypes

		return aggregates;

	}
		@Operation(summary = "Recuperar las marcas de vehiculos alquilables ", description = " Recuperar las marcas de vehiculos alquilables. ", tags = {})
		@ApiResponses(value = {
				@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = VehiculosQueryResponse.class))) })
		@ResponseStatus(HttpStatus.OK)
					 // old: /propiedades
		@GetMapping(value = "/tiposMarcas", produces = MediaType.APPLICATION_JSON_VALUE)
		public /*List<Map<String, Object>>*/Map<String, Object> getTiposMarcas(
//				@RequestParam(value = "tiposElectrico", required = false) List<String> tiposElectrico,
//				@RequestParam(value = "tiposVehiculo", required = false) List<String> tiposVehiculo,
//				@RequestParam(value = "ciudadesVehiculo", required = false) String ciudadVehiculo,
//				@RequestParam(value = "ciudadesDevolverVehiculo", required = false) String ciudadDevolverVehiculo 
				) {
			return indexService.getTiposMarcas();

		}
			
		@Operation(summary = "Recuperar las tipos de vehiculos alquilables ", description = " Recuperar las tipos de vehiculos alquilables desde las propiedades de Springboot. ", tags = {})
		@ApiResponses(value = {
				@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = VehiculosQueryResponse.class))) })
		@ResponseStatus(HttpStatus.OK)				
		@GetMapping(value = "/tiposVehiculos", produces = MediaType.APPLICATION_JSON_VALUE)
			public Map<String, Object> getTiposVehiculos() {
				return indexService.getTiposVehiculos();
		}

//	@Operation(summary = "uc01 RF1.6 getAggregationsMarcasVElectricos() ", description = " Get CityCars", tags = {})
//	@ApiResponses(value = {
//			@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Car.class))) })
//	@ResponseStatus(HttpStatus.OK)
//	@GetMapping("/marcas-v-electricos") // pagino sin usar CriteriaQuery
//	public Map<String, Object> getAggregationsMarcasVElectricos() { // List<Map<String, Object>>
//		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder();
//
//		// Agregar consulta
//		nativeSearchQueryBuilder.withQuery(QueryBuilders.termQuery("Alquilable", "S"));
//
//		// Agregar agregación
//		nativeSearchQueryBuilder.addAggregation(
//				AggregationBuilders.terms("marcas_vehiculo_distinct").field("MarcaVehiculo.keyword").size(10) // Tamaño
//																												// máximo
//																												// de la
//																												// lista
//																												// de
//																												// resultados
//		);
//
//		// Establecer tamaño 0 para evitar recuperar documentos
//		// nativeSearchQueryBuilder.withMaxResults(0); //withSize(0);
//
//		// Construir consulta
//		Query query = nativeSearchQueryBuilder.build();
//		SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
//
//		Map<String, Object> aggregates = new LinkedHashMap<>();
//		if (result.hasAggregations()) {
//			Map<String, Aggregation> aggs = result.getAggregations().asMap();
//			ParsedStringTerms marcasVehiculoElectricoAgg = (ParsedStringTerms) aggs.get("marcas_vehiculo_distinct");
//
//			List<Map<String, Object>> marcasVehiculos = new ArrayList<>();
//			marcasVehiculoElectricoAgg.getBuckets().forEach(bucket -> {
//				Map<String, Object> typeDetails = new LinkedHashMap<>();
//				typeDetails.put("available", bucket.getDocCount() > 0);
//				typeDetails.put(Constantes.QUANTITY, (int) bucket.getDocCount());
//				typeDetails.put("value", bucket.getKey().toString());
//				marcasVehiculos.add(typeDetails);
//			});
//
//			// aggregates.add(Map.of("marcas_vehiculo_distinct", marcasVehiculos)); //si
//			// fuera List<Map<String, Object>>
//			aggregates.put("marcas_vehiculo_distinct", marcasVehiculos);
//		}
//		return aggregates;
//	}

		public static String fromClave(String clave) {
			for (TipoVehiculoEnum tipo : TipoVehiculoEnum.values()) {
				if (tipo.getClave().equalsIgnoreCase(clave)) {
					return tipo.getValor();
				}
			}
			return null; // Manejo del caso cuando la clave no coincide con ningún enum
		}

		@Operation(summary = "NO usado:  UC-01: Dado 1 nombre de ciudad, buscar los que empiecen por la misma letra que nombre, o que la ciudad contenga la palabra nombre", description = " Recuperar las CiudadesVehiculo con findCityCars", tags = {})
		@ApiResponses(value = {
				@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseCitiesDTO.class))) })
		@ResponseStatus(HttpStatus.OK)
		// old: /search-city
		@GetMapping(value = "/ciudades", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseCitiesDTO/* List<V3EfastEntity> */ getCiudades(
				@RequestParam /* @NotBlank */ @Size(max = 10) String nombre,
				@RequestParam(defaultValue = "false") /* @NotNull */ Boolean ciudadesDevolverVehiculos/* dropOff */) {

			return indexService.getCiudades(nombre, ciudadesDevolverVehiculos);
		}

		// ------------------APIs que carguen 1 ejecucion por delante
		// ----------------------------
		@Operation(summary = "UC-01: Recupera todas las ciudades Únicas y posibles de origen (de CiudadesVehiculo) + Alquilable=S", description = " Recuperar las ciudadesDevolverVehiculos a partir del ciudadesVehiculo", tags = {})
		@ApiResponses(value = {
				@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseCitiesDTO.class))) })
		@ResponseStatus(HttpStatus.OK)
		@GetMapping(value = "/ciudadesVehiculo", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseCitiesDTO getCiudadesVehiculo(
//			@RequestParam(value = "tiposElectrico", required = false) List<String> tiposElectrico,
//			@RequestParam(value = "tiposVehiculo", required = false) List<String> tiposVehiculo,
//			@RequestParam(value = "marcasVehiculo", required = false) List<String> marcasVehiculo
		) {
			return indexService.getCiudadesVehiculo();
		}

		@Operation(summary = "UC-01: Dado 1  una  CiudadesVehiculo (ej 'Madrid' ) recupere todas las posibles ciudades Únicas y de CiudadesDevolverVehiculos. que CONTENGA la ciudad(ej 'Madrid' aparece en 'CiudadesVehiculo': 'Santa Cruz de Tenerife,Madrid' )   + Alquilable=S   ", description = " Recuperar las ciudadesDevolverVehiculos a partir del ciudadesVehiculo", tags = {})
		@ApiResponses(value = {
				@ApiResponse(responseCode = "200", description = "Successful response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseCitiesDTO.class))) })
		@ResponseStatus(HttpStatus.OK)
		@GetMapping(value = "/ciudadesDevolverVehiculos", produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseCitiesDTO getCiudadesDevolverVehiculos(@RequestParam @NotBlank String nombreCiudadesVehiculo) {
			return indexService.getCiudadesDevolverVehiculos(nombreCiudadesVehiculo);
		}

}
