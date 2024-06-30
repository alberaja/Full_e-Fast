package com.elastic.efast.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.range.ParsedRange;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedLongTerms;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import com.elastic.efast.config.ConfigProperties;
import com.elastic.efast.config.FiltrosProperties;
import com.elastic.efast.dto.ResponseVehiculosDTO;
import com.elastic.efast.dto.EsClient.VehiculosQueryResponse;
import com.elastic.efast.entity.V3EfastEntity;
import com.elastic.efast.service.AggregationsService;
import com.elastic.efast.util.Constantes;
import com.elastic.efast.util.TipoVehiculoEnum;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
public class AggregationsServiceImpl implements AggregationsService{
	
//	@Value("${transmissionTypes.values}")
//  private String transmissionFilterProp;
	
//	@Value("${fuelTypes.values}")
//  private String fuelTypesFilterProp;
	
//	@Value("${carTypes.values}")
//  private String carTypesFilterProp;
	
//	@Value("${maximoNumplazasTypes.values}")
//  private String maximoNumplazasTypesFilterProp;
	
	@Autowired
    private ConfigProperties config;
	
	@Autowired
    private FiltrosProperties filtrosProp;
	
	private final ElasticsearchOperations elasticClient;
	
	private final ModelMapper modelMapper = new ModelMapper();
	
	private static final String S = "S";

	@Override
	public Object findVehiculosAggregates(Integer idVehiculo, List<String> cajasCambio, List<String> tiposElectrico,
			List<String> tiposVehiculo, List<Integer> numPlazasMin, String maximoKmStr, Long maximoKm,
			List<String> marcasVehiculo, String ciudadVehiculo, String ciudadDevolverVehiculo, String fechaHoraIni,
			String fechaHoraFin, int page) {
		// Construir la query Postman: ! NOnested +aggregates: sin comentarios
				// Postman endpoint: UC03 filter-modal-2
		BoolQueryBuilder queryBuilder = createQueryBuilder(idVehiculo, cajasCambio, tiposElectrico, tiposVehiculo, numPlazasMin,
				maximoKmStr, maximoKm, marcasVehiculo, ciudadVehiculo, ciudadDevolverVehiculo, fechaHoraIni,
				fechaHoraFin);

				NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(queryBuilder);
				//nativeSearchQueryBuilder.withPageable(PageRequest.of(page, size));

			Map<String, List<Map<String, Object>>> responseAggAja = new LinkedHashMap<>();
			List<ResponseVehiculosDTO> vehiculosDTO;
			int paginatorSize = config.getPaginatorSizeVehicles(); //10
			double totalHits = 0L;
			double totalPages = 0;
			
			if (idVehiculo == null) {
				// solo necesario en UC-03, no en UC-02.
				nativeSearchQueryBuilder.addAggregation(
						AggregationBuilders.terms("tipoVehiculoElectrico").field("Caracteristicas.TipoVehiculo.keyword").size(10).order(BucketOrder.key(true)));
				nativeSearchQueryBuilder
						.addAggregation(AggregationBuilders.terms("cajaCambio").field("Caracteristicas.CajaCambio").size(5).order(BucketOrder.key(true)));
				nativeSearchQueryBuilder.addAggregation(AggregationBuilders.terms("tiposVehiculo").field("TipoVehiculo.keyword").size(10).order(BucketOrder.key(true)));	//carTypes
				nativeSearchQueryBuilder.addAggregation(
						AggregationBuilders.range("Rangos de Kilometros Maximos").field("Caracteristicas.MaximodeKm")
								// .addRange(10000000000L, Double.POSITIVE_INFINITY, "Ilimitado")
								.addRange("Ilimitado", 101L, Double.POSITIVE_INFINITY) // 10000000000L	// .addRange() incluye el límite inferior pero no el límite superior
								// .addRange(Double.NEGATIVE_INFINITY, 9999999L, "Limitado"));
								.addRange("Limitado", 0L , 101L)); //9999999999L //9999999L (ok en vehiculos-efast)   //Double.NEGATIVE_INFINITY  //Limitado: 0 hasta 9.999.999   o 10000000000L
				// sin traducir a Ilimitado/Limitado
				// nativeSearchQueryBuilder.addAggregation(AggregationBuilders.range("RangoKmsMaximosEnNumero").field("Caracteristicas.MaximodeKm"));
				nativeSearchQueryBuilder
						.addAggregation(AggregationBuilders.terms("maximoNumPlazas").field("Caracteristicas.NumPlazas").size(10).order(BucketOrder.key(true)));  // Orden ascendente por términos
				nativeSearchQueryBuilder.addAggregation(
						AggregationBuilders.terms("marcasVehiculo").field("MarcaVehiculo.keyword").size(50).order(BucketOrder.key(true))); //Maximo nº marcas a mostrar (size=10 por default)

				// Descomentar si quiero no recibir resultados, solo aggregates
				 //nativeSearchQueryBuilder.withMaxResults(0);

				// Opcionalmente, podemos paginar los resultados
				// nativeSearchQueryBuilder.withPageable(PageRequest.of(0, 10));
				
				// solo aplicar "evitar perder el contexto=evitar perder el conteo de los checkbox NO seleccionados." si selecciona alguno dentro de los filtros controlados
				// Si NoResetearValoresa0=true--> se mantienen(reemplazan) con los que recupera del aggregates con la query solo Alquilable=S
				// (transmissionTypes no hace falta), tipoVehiculoElectrico, carTypes
				boolean NoResetearValoresa0 = false;
				if ((tiposElectrico != null && !tiposElectrico.isEmpty() || tiposVehiculo != null && !tiposVehiculo.isEmpty()
						 || (maximoKm != null || maximoKmStr != null) || numPlazasMin != null
						 //quitar   || numPlazasMin != null
						 || marcasVehiculo != null  ) 
						 && (ciudadVehiculo==null && ciudadDevolverVehiculo==null)) //guardar contexto solo si no ha filtrado por ciudades 
				{
					NoResetearValoresa0 = true;
				}
				NoResetearValoresa0 = false;
				Query query = nativeSearchQueryBuilder.build();
				// aja
				log.info("query generada: " + query.toString());
				
				// paginar vehiculos de tam en tam valor.  page = valor seleccionado en el Paginador
				log.info("page (sin -1): "+ page + /*", tam:"+tam + ,*/ "tam enviado:"+paginatorSize);
				query.setPageable(org.springframework.data.domain.PageRequest.of(page-1, paginatorSize));  // tam = paginatorSize;
//				query.setPageable(org.springframework.data.domain.PageRequest.of(pag , tam));		 	   //(pag, tam) 
				SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
				totalHits = result.getTotalHits();
				log.info("total hits: " + totalHits );
				totalPages = Math.ceil((double)totalHits/(double)paginatorSize);

				// mapresponse Entity(V3EfastEntity) to DTO
//						for (V3EfastEntity searchHit : result.getSearchHits().stream().map(SearchHit::getContent).toList()) {}
				List<V3EfastEntity> entities = result.stream().map(SearchHit::getContent).collect(Collectors.toList());

				/*List<ResponseVehiculosDTO>*/ vehiculosDTO = entities.stream()
//			                .map(entity -> modelMapper.map(entity, ResponseVehiculosDTO.class))
						// llama a mapToVehiculoDTO() que añade el campo marcay_modelo_vehiculo tras concatenar 2 fields
						.map(this::mapToVehiculoDTO).collect(Collectors.toList());
//				uso original: ResponseVehiculosDTO responseVehicles = modelMapper.map(result.getSearchHits().stream().map(SearchHit::getContent), ResponseVehiculosDTO.class);

//				Map<String, List<Map<String, Object>>> responseAggAja = new LinkedHashMap<>();
				if (result.hasAggregations()) {
					Map<String, Aggregation> aggs = result.getAggregations().asMap();
					ParsedStringTerms tipoVehiculoElectricoAgg = (ParsedStringTerms) aggs.get("tipoVehiculoElectrico");
					ParsedStringTerms transmissionTypesAgg = (ParsedStringTerms) aggs.get("cajaCambio");
					ParsedStringTerms carTypesAgg = (ParsedStringTerms) aggs.get("tiposVehiculo");	// carTypes
					ParsedStringTerms brandsVehiclesAgg = (ParsedStringTerms) aggs.get("marcasVehiculo");	// carTypes
					
					ParsedRange maximodeKmTypesAgg = (ParsedRange) aggs.get("Rangos de Kilometros Maximos"); // ParsedStringTerms
					// ParsedLongTerms
					// ParsedRange maximodeKmTypesNumAgg = (ParsedRange)
					// aggs.get("RangoKmsMaximosEnNumero");
					ParsedLongTerms maximoNumplazasAgg = (ParsedLongTerms) aggs.get("maximoNumPlazas"); // ParsedStringTerms

					// Formar respuestas
					List<Map<String, Object>> aggregates = new ArrayList<>();
					// Usar filtrosProp  mejor que @Values      //String[] transmRequiredFilt = transmissionFilterProp.split(",");
					String[] transmRequiredFilt = filtrosProp.getTransmissionTypes().toArray(new String[filtrosProp.getTransmissionTypes().size()]);
					log.info("transmissionTypesAgg: "+ transmissionTypesAgg);
					List<Map<String, Object>> transmissionAggs = StringAggs(transmissionTypesAgg, transmRequiredFilt, false, NoResetearValoresa0);
					aggregates.add(Map.of("cajaCambio", transmissionAggs));
					
					String[] fuelRequiredFilt = filtrosProp.getFuelTypes().toArray(new String[filtrosProp.getFuelTypes().size()]); // String[] fuelRequiredFilt = fuelTypesFilterProp.split(",");	
					// calcular aggregates SI se ha seleccionado un filtro de un grupo <> al filtro concreto actual(tiposElectrico)
					//Object fuelTypesAggs = tiposVehiculoTiposElectrico(tiposVehiculo, queryBuilder);
					// mantener el contexto del resto de checkbox EN el grupo de filtros concreto
					List<Map<String, Object>> fuelTypesAggs = StringAggs(tipoVehiculoElectricoAgg, fuelRequiredFilt, true, NoResetearValoresa0);
					aggregates.add(Map.of("tiposElectrico", fuelTypesAggs));
					
					String[] carRequiredFilt = filtrosProp.getCarTypes().toArray(new String[filtrosProp.getCarTypes().size()]); // String[] carRequiredFilt = carTypesFilterProp.split(",");			
					List<Map<String, Object>> carTypesAggs = StringAggs(carTypesAgg, carRequiredFilt, false, NoResetearValoresa0);
					aggregates.add(Map.of("tiposVehiculo", carTypesAggs)); // carTypes
					
					String[] brandsVehicleFilt = filtrosProp.getBrandsVehicle().toArray(new String[filtrosProp.getBrandsVehicle().size()]); // String[] carRequiredFilt = carTypesFilterProp.split(",");			
					List<Map<String, Object>> brandsVehiclesAggs = StringAggs(brandsVehiclesAgg, brandsVehicleFilt, false, NoResetearValoresa0);
					aggregates.add(Map.of("marcasVehiculo", brandsVehiclesAggs)); // brandsVehicle = marcaVehiculo 
					
					// ParsedRange
					List<Map<String, Object>> maximodeKmTypes = new ArrayList<>();			
					maximodeKmTypesAgg.getBuckets().forEach(bucket -> {
						Map<String, Object> typeDetails = new LinkedHashMap<>();
						typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
						typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
						typeDetails.put(Constantes.VALOR, bucket.getKey().toString());				
						maximodeKmTypes.add(typeDetails);
					});
					
					// no necesario añadir los de 0, se hace en la query automatico
					aggregates.add(Map.of("maximoDeKms", maximodeKmTypes)); //maximodeKmTypes		
					
					// ParsedLongTerms
					 List<Map<String, Object>> maximoNumplazasTypes = new ArrayList<>();
			            maximoNumplazasAgg.getBuckets().forEach(bucket -> {
			                Map<String, Object> typeDetails = new LinkedHashMap<>();
			                typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
			                typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
			                typeDetails.put(Constantes.VALOR, bucket.getKey().toString());
			                maximoNumplazasTypes.add(typeDetails);
			            });
			            String[] maximoNumplazasTypesRequiredFilt = filtrosProp.getMaximoNumplazasTypes().toArray(new String[filtrosProp.getMaximoNumplazasTypes().size()]); // String[] maximoNumplazasTypesRequiredFilt = maximoNumplazasTypesFilterProp.split(",");	
			            for (String requiredType : Arrays.asList(maximoNumplazasTypesRequiredFilt)) {
			    		    if (maximoNumplazasTypes.stream().noneMatch(type -> type.get(Constantes.VALOR).equals(requiredType))) {
			    		    	// UC03 Filter menu con checkboxs
			    		    	// evitar perder el contexto=evitar perder el conteo de los checkbox NO seleccionados. Recuperar conteo de todos aggregates.
			    		    	if (NoResetearValoresa0 && (maximoNumplazasAgg.getName().equals("maximoNumPlazas") )/*maximoNumplazas*/ /*solo los ParsedLongTerms*/ ) {
			    					//volver a recuperar el contexto
			    		    		Map<String, Aggregation> aggsKmsyPlazas = soloAggregationsKmsyPlazas();
			    		    		//mantener el conteo Real para ese filtro
			    		    		ParsedLongTerms maximoNumplazas = (ParsedLongTerms) aggsKmsyPlazas.get("maximoNumPlazas");
			    		    		Map<String, Object> typeDetails = new HashMap<>();
			    		    		// ParsedLongTerms
			    		    		maximoNumplazas.getBuckets().forEach(bucket -> {
							    		log.info("valor: "+ bucket.getKey().toString());
							    			// Añadir los que SI tienen valores en numVehicles. ej PHEV equal PHEV
							    			 if ( requiredType.equals(bucket.getKey().toString())) {
									    			typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
									    			typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
									    			typeDetails.put(Constantes.VALOR, bucket.getKey().toString());
							    			 }
									});
									if (!typeDetails.isEmpty()) {
										maximoNumplazasTypes.add(typeDetails);
									} else { // Añadir los que NO tienen valores en numVehicles. aqui entra si
												// stringTerms.getName()=transmissionTypes
										typeDetails.put(Constantes.DISPONIBLE, false);
										typeDetails.put(Constantes.NUMVEHICULOS, 0);
										typeDetails.put(Constantes.VALOR, requiredType);
										maximoNumplazasTypes.add(typeDetails);
									}
								} else {
									Map<String, Object> typeDetails = new HashMap<>();
									typeDetails.put(Constantes.DISPONIBLE, false);
									typeDetails.put(Constantes.NUMVEHICULOS, 0);
									typeDetails.put(Constantes.VALOR, requiredType);
									maximoNumplazasTypes.add(typeDetails);
								}
			    		    }
			    		}
					aggregates.add(Map.of("maximoNumPlazas", maximoNumplazasTypes));//maximoNumPlazasTypes
					
					//aggregates = StringAggs(tipoVehiculoElectricoAgg);
//					transmissionTypesAgg.getBuckets().forEach(bucket -> {
//						Map<String, Object> typeDetails = new LinkedHashMap<>();				
//						typeDetails.put("available", bucket.getDocCount() > 0);
//						typeDetails.put("numVehicles", (int) bucket.getDocCount());
//						typeDetails.put("value", bucket.getKey().toString());
//						transmissionTypes.add(typeDetails);
//					});
//					// Agregar valores requeridos que no estén presentes en los buckets
//					String[] transmRequiredFilt = transmissionFilterProp.split(",");
//					for (String requiredType : Arrays.asList(transmRequiredFilt)) {
//					    if (transmissionTypes.stream().noneMatch(type -> type.get("value").equals(requiredType))) {
//					        Map<String, Object> typeDetails = new HashMap<>();
//					        typeDetails.put("available", false);
//					        typeDetails.put("numVehicles", 0);
//					        typeDetails.put("value", requiredType);      
//					        transmissionTypes.add(typeDetails);
//					    }
//					}
					/// ...
					// validar .propperties: #Minimos Filtros a mostrar en el filtrador izquierdo

					// Key que yo quiera ej: Tipo de Vehiculos Electrico en
			//		aggregates.add(Map.of("transmissionTypes", transmissionTypes));
//					aggregates.add(Map.of("fuelTypes", tipoVehiculoTypes));
//					aggregates.add(Map.of("carTypes", carTypes));
//					aggregates.add(Map.of("maximodeKmTypes", maximodeKmTypes));
//					aggregates.add(Map.of("maximoNumPlazasTypes", maximoNumPlazasTypes));

					responseAggAja.put("aggregates", aggregates);
				}
			} else {
				// Devolver solo aggregates si ha seleccionado 1 vehiculo concreto
				//TODO: unificar recuperar vehiculos desde 1 sola funcion
				Query query = nativeSearchQueryBuilder.build();
				query.setPageable(org.springframework.data.domain.PageRequest.of(0, paginatorSize));  //page=0, tam=paginatorSize
				SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);

				// mapresponse Entity(V3EfastEntity) to DTO
//						for (V3EfastEntity searchHit : result.getSearchHits().stream().map(SearchHit::getContent).toList()) {}
				List<V3EfastEntity> entities = result.stream().map(SearchHit::getContent).collect(Collectors.toList());

				/*List<ResponseVehiculosDTO>*/ vehiculosDTO = entities.stream()
//			                .map(entity -> modelMapper.map(entity, ResponseVehiculosDTO.class))
						// llama a mapToVehiculoDTO() que añade el campo marcay_modelo_vehiculo tras concatenar 2 fields
						.map(this::mapToVehiculoDTO).collect(Collectors.toList());
				
				responseAggAja = null;
			}

			return new VehiculosQueryResponse(vehiculosDTO, responseAggAja, totalHits, totalPages);
		}
	
	private ResponseVehiculosDTO mapToVehiculoDTO(V3EfastEntity entity) {
		ResponseVehiculosDTO dto = modelMapper.map(entity, ResponseVehiculosDTO.class);
		dto.setMarcayModeloVehiculo(entity.getMarcaVehiculo() + " " + entity.getModeloVehiculo());
		return dto;
	}
	
	private BoolQueryBuilder createQueryBuilder(Integer idVehiculo, List<String> cajasCambio, List<String> tiposElectrico,
			List<String> tiposVehiculo, List<Integer> numPlazasMin, String maximoKmStr, Long maximoKm,
			List<String> marcasVehiculo, String ciudadVehiculo, String ciudadDevolverVehiculo, String fechaHoraIni,
			String fechaHoraFin) {
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
		
		//TODO: añadir required params + quitar aggregates con flag boolean
		if (idVehiculo != null) {
			//Los filtros son más eficientes que must, porque no requieren el cálculo de puntuación.
			queryBuilder.filter(QueryBuilders.termQuery("_id", idVehiculo));
//            nativeSearchQueryBuilder.withQuery(QueryBuilders.idsQuery().addIds("4"));
        }  		
		
		// seleccion multiple: tiposElectrico, numPlazas
		// seleccion a/b: cajaCambio, tiposVehiculo, maximoKmStr

		if (cajasCambio != null && !cajasCambio.isEmpty()) {
			queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.CajaCambio", cajasCambio));
		}
		
		if (tiposElectrico != null && !tiposElectrico.isEmpty() ) { // && tiposElectrico.size() != 1  && !tiposElectrico.get(0).equals("*")) {
            		// must: devolver resultados SOLO en el que coincida con el param tiposElectrico
			//queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.TipoVehiculo.keyword", tiposElectrico));
					// should: devolver todos resultados sin recuperar resultados (que si tienen resultados) con valor a 0
			// si selecciona alguno(s) de seleccion multiple (como tiposElectrico)--> should para devolver todos resultados sin recuperar resultados con valor a 0 (que si tienen resultados) 
								//// si selecciona varios de seleccion multiple (como tiposElectrico)--> must para devolver todos resultados cumplan AMBAS/todas condiciones. Ojo al recuperar resultados con valor a 0
			// si selecciona alguno de seleccion multiple (como tiposElectrico) + filtro de otra seccion --> must para devolver todos resultados cumplan AMBAS/todas condiciones. Ojo al recuperar resultados con valor a 0
			// tiposElectrico.size() == 1 &&
//			if(  ((tiposVehiculo == null || tiposVehiculo.isEmpty()) && (cajasCambio == null || cajasCambio.isEmpty()) && (numPlazasMin == null || numPlazasMin==0) && (maximoKm == null || maximoKmStr == null) )) {
//				queryBuilder.should(QueryBuilders.termsQuery("Caracteristicas.TipoVehiculo.keyword", tiposElectrico));
//				
//			} else {
				queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.TipoVehiculo.keyword", tiposElectrico));
//			}
//			queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.TipoVehiculo.keyword", filtrosProp.getFuelTypes()));
        }

		if (tiposVehiculo != null && !tiposVehiculo.isEmpty()) {
			queryBuilder.must(QueryBuilders.termsQuery("TipoVehiculo.keyword", tiposVehiculo));
		}

		if (numPlazasMin != null && !numPlazasMin.isEmpty()) {
			// queryBuilder.must(QueryBuilders.rangeQuery("Caracteristicas.NumPlazas").lte(numPlazasMin));
			// //gte
			queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.NumPlazas", numPlazasMin));
		} /*
			 * else if(tiposVehiculo != null && tiposVehiculo.get(0).equals("Moto")) {
			 * queryBuilder.must(QueryBuilders.rangeQuery("Caracteristicas.NumPlazas").gte(0
			 * ).lte(2)); }
			 */

		if (maximoKm != null || maximoKmStr != null) {
			if (maximoKmStr != null && !maximoKmStr.isEmpty()) {
				if (maximoKmStr.equalsIgnoreCase("Limitado")) {
					maximoKm = 100L; // 9999999L; (ok en vehiculos-efast) //Limitado: 0 hasta 9.999.999 //1000L;
				} else { // Ilimitado
					// maximoKm = 10000000000L;
					queryBuilder.must(QueryBuilders.rangeQuery("Caracteristicas.MaximodeKm").gte(101L)); // 10000000000L
																											// 1001L
				}
			}
			queryBuilder.must(QueryBuilders.rangeQuery("Caracteristicas.MaximodeKm").lte(maximoKm));
		}

//		Los filtros son más eficientes que must, porque no requieren el cálculo de puntuación.
		queryBuilder.filter(QueryBuilders.termQuery("Alquilable", S));
//		 queryBuilder.must(QueryBuilders.termQuery("Alquilable", S));

		if (marcasVehiculo != null && !marcasVehiculo.isEmpty()) {
			queryBuilder.must(QueryBuilders.termsQuery("MarcaVehiculo.keyword", marcasVehiculo));
		}
		if (ciudadVehiculo != null && !ciudadVehiculo.isEmpty()) {
			queryBuilder.must(QueryBuilders.matchQuery("CiudadesVehiculo", ciudadVehiculo));
		}
		if (ciudadDevolverVehiculo != null && !ciudadDevolverVehiculo.isEmpty()) {
			queryBuilder.must(QueryBuilders.matchQuery("CiudadesDevolverVehiculos", ciudadDevolverVehiculo));
		}
		if (fechaHoraIni != null) {
			queryBuilder.must(QueryBuilders.rangeQuery("FechaIni").lte(fechaHoraIni)); // LocalDateTime.parse(fechaHoraIni)
		}
		if (fechaHoraFin != null) {
			queryBuilder.must(QueryBuilders.rangeQuery("FechaFin").gte(fechaHoraFin));
		}
		return queryBuilder;
	}
	
	// solo para los aggs de tipo ParsedStringTerms
		private List<Map<String, Object>> StringAggs(ParsedStringTerms stringTerms, String [] transmRequiredFilt, boolean valueHuman, boolean NoResetearValoresa0) {
			List<Map<String, Object>> aggsTypes = new ArrayList<>();
			//List<Map<String, Object>> aggregatesReturned = new ArrayList<>();
			//(recorrer) resultados del aggregate ejecutado en stringTerms
			stringTerms.getBuckets().forEach(bucket -> {
//				if (bucket.getKey().equals("fuelTypes") &&  tiposElectrico.size() != 1 ) {
//					int numBEVS = (int) bucket.getDocCount();
//				}
				Map<String, Object> typeDetails = new LinkedHashMap<>();		
				typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
				typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
				typeDetails.put(Constantes.VALOR, bucket.getKey().toString());
				if (valueHuman) {
					String tipoElectricoHuman = fromClave(bucket.getKey().toString());
					typeDetails.put(Constantes.VALOR_HUMANO, tipoElectricoHuman);
				}
				aggsTypes.add(typeDetails);
			});
			// Agregar valores requeridos que no estén presentes en los buckets y en aggsTypes
//			String[] transmRequiredFilt = transmissionFilterProp.split(",");		
			for (String requiredType : Arrays.asList(transmRequiredFilt)) {
			    if (aggsTypes.stream().noneMatch(type -> type.get(Constantes.VALOR).equals(requiredType))) {
			    	// UC03 Filter menu con checkboxs
			    	// evitar perder el contexto=evitar perder el conteo de los checkbox NO seleccionados. Recuperar conteo de todos aggregates. 
			    	if (NoResetearValoresa0 && (stringTerms.getName().equals("tipoVehiculoElectrico") || stringTerms.getName().equals("tiposVehiculo")  /*carTypes*/ /*solo los ParsedStringTerms*/ 
			    		|| stringTerms.getName().equals("marcasVehiculo")    )  ) {
						//volver a recuperar el contexto
			    		Map<String, Aggregation> aggs = soloAggregations();
			    		//mantener el conteo Real para ese filtro
			    		ParsedStringTerms tipoVehiculoElectricoAgg = (ParsedStringTerms) aggs.get("tipoVehiculoElectrico");
			    		ParsedStringTerms carTypesAgg = (ParsedStringTerms) aggs.get("tiposVehiculo"); //carTypes
			    		ParsedStringTerms marcasVehiculoAgg = (ParsedStringTerms) aggs.get("marcasVehiculo");
			    		
			    		Map<String, Object> typeDetails = new HashMap<>();
			    		// recuperar para luego recorrer el ParsedStringTerms correcto
//			    		ParsedStringTerms parsedTerms = Optional.ofNullable(stringTerms)
//			    			    .filter(terms -> "tipoVehiculoElectrico".equals(terms.getName()))
//			    			    .map(terms -> tipoVehiculoElectricoAgg)
//			    			    .orElseGet(() -> Optional.ofNullable(stringTerms)
//			    			        .filter(terms -> "carTypes".equals(terms.getName()))
//			    			        .map(terms -> carTypesAgg)
//			    			        .orElse(null));		    		
						ParsedStringTerms parsedTerms = null;
						switch (stringTerms.getName()) {
						case "tipoVehiculoElectrico": {
							parsedTerms = tipoVehiculoElectricoAgg;
							break;
						}
						case "tiposVehiculo": {	//carTypes
							parsedTerms = carTypesAgg;
							break;
						}
						case "marcasVehiculo": {
							parsedTerms = marcasVehiculoAgg;
							break;
						}
						}
						if (parsedTerms != null) {
							// ParsedStringTerms
							parsedTerms.getBuckets().forEach(bucket -> {
					    		System.out.println("valor: "+ bucket.getKey().toString());
					    			// Añadir los que SI tienen valores en numVehicles. ej PHEV equal PHEV
					    			 if ( requiredType.equals(bucket.getKey().toString())) {
							    			typeDetails.put(Constantes.DISPONIBLE, bucket.getDocCount() > 0);
							    			typeDetails.put(Constantes.NUMVEHICULOS, (int) bucket.getDocCount());
							    			typeDetails.put(Constantes.VALOR, bucket.getKey().toString());
							    			if (valueHuman) {
							    				String tipoElectricoHuman = fromClave(bucket.getKey().toString());
							    				typeDetails.put(Constantes.VALOR_HUMANO, tipoElectricoHuman);
							    			}
					    			 }
					    		});
						} 
						// maximodeKmTypesAgg es maximoNumplazasAgg, y maximoNumPlazasAgg es ParsedLongTerms 
						
			    		
			    		if (!typeDetails.isEmpty()) {
			    			 aggsTypes.add(typeDetails);
						} else { // Añadir los que NO tienen valores en numVehicles. aqui entra si stringTerms.getName()=transmissionTypes
							typeDetails.put(Constantes.DISPONIBLE, false);
					        typeDetails.put(Constantes.NUMVEHICULOS, 0);
					        typeDetails.put(Constantes.VALOR, requiredType);
					        if (valueHuman) {
			    				String tipoElectricoHuman = fromClave(requiredType);
			    				typeDetails.put(Constantes.VALOR_HUMANO, tipoElectricoHuman);
			    			}
					        aggsTypes.add(typeDetails);
						}
					} else {
			        Map<String, Object> typeDetails = new HashMap<>();
			        typeDetails.put(Constantes.DISPONIBLE, false);
			        typeDetails.put(Constantes.NUMVEHICULOS, 0);
			        typeDetails.put(Constantes.VALOR, requiredType);    
			        if (valueHuman) {
						String tipoElectricoHuman = fromClave(requiredType);
						typeDetails.put(Constantes.VALOR_HUMANO, tipoElectricoHuman);
					}
			        aggsTypes.add(typeDetails);
					}
			    }
			}
//			aggregatesReturned.add(Map.of("transmissionTypes", aggsTypes));
			
			return aggsTypes; //aggregatesReturned;
		} 

		public static String fromClave(String clave) {
			for (TipoVehiculoEnum tipo : TipoVehiculoEnum.values()) {
				if (tipo.getClave().equalsIgnoreCase(clave)) {
					return tipo.getValor();
				}
			}
			return null; // Manejo del caso cuando la clave no coincide con ningún enum
		}
		
		// ejecuta aggregates solo para el query alquilale=S sin mas filtros
		public Map<String, Aggregation> soloAggregations() {
			BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
			queryBuilder.must(QueryBuilders.termQuery("Alquilable", S));
			// Recomendando para que vayan mas rapidas las querys:  "_source": false ,"size"   : 0 
//			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
//	        searchSourceBuilder.query(queryBuilder);
//	        searchSourceBuilder.fetchSource(false); // Para deshabilitar el retorno de _source . = "_source": false
//	        searchSourceBuilder.size(0); // Para establecer el tamaño de resultados en 0 . = "size"   : 0 
			
			
			NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(queryBuilder);//no necesaria query para recuperar SOLO todos aggregates//.withQuery(queryBuilder);
//			nativeSearchQueryBuilder.withMaxResults(0); 
			// Configurar el tamaño de la página en 0 . = "size"   : 0 
//			nativeSearchQueryBuilder.withPageable(PageRequest.of(0, 0));

			nativeSearchQueryBuilder.addAggregation(
					AggregationBuilders.terms("tipoVehiculoElectrico").field("Caracteristicas.TipoVehiculo.keyword"));
//			nativeSearchQueryBuilder
//					.addAggregation(AggregationBuilders.terms("transmissionTypes").field("Caracteristicas.CajaCambio"));
			nativeSearchQueryBuilder.addAggregation(AggregationBuilders.terms("tiposVehiculo").field("TipoVehiculo.keyword"));  //carTypes
			nativeSearchQueryBuilder.addAggregation(AggregationBuilders.terms("marcasVehiculo").field("MarcaVehiculo.keyword").size(50));  //Maximo nº marcas a mostrar (size=10 por default)
			
			Query query = nativeSearchQueryBuilder.build();
			SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
			
			Map<String, Aggregation> aggs = result.getAggregations().asMap();
//			Recuperar el q necesite desde cada seccion desde donde se llama a esta func soloAggregations()
//			ParsedStringTerms tipoVehiculoElectricoAgg = (ParsedStringTerms) aggs.get("tipoVehiculoElectrico");
//			ParsedStringTerms transmissionTypesAgg = (ParsedStringTerms) aggs.get("transmissionTypes");
//			ParsedStringTerms carTypesAgg = (ParsedStringTerms) aggs.get("carTypes");
			
			return aggs;
		}
		
		public Map<String, Aggregation> soloAggregationsKmsyPlazas() {
			BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
			queryBuilder.must(QueryBuilders.termQuery("Alquilable", S));
			NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(queryBuilder);//no necesaria query para recuperar SOLO todos aggregates//.withQuery(queryBuilder);
//			nativeSearchQueryBuilder.withMaxResults(0); 
			// Configurar el tamaño de la página en 0
//			nativeSearchQueryBuilder.withPageable(PageRequest.of(0, 0));

			nativeSearchQueryBuilder.addAggregation(
					AggregationBuilders.range("Rangos de Kilometros Maximos").field("Caracteristicas.MaximodeKm")
							// .addRange(10000000000L, Double.POSITIVE_INFINITY, "Ilimitado")
							.addRange("Ilimitado", 101L, Double.POSITIVE_INFINITY) //10000000000L
							// .addRange(Double.NEGATIVE_INFINITY, 9999999L, "Limitado"));
							.addRange("Limitado", Double.NEGATIVE_INFINITY, 100L));//9999999L
			// sin traducir a Ilimitado/Limitado
			// nativeSearchQueryBuilder.addAggregation(AggregationBuilders.range("RangoKmsMaximosEnNumero").field("Caracteristicas.MaximodeKm"));
			nativeSearchQueryBuilder
					.addAggregation(AggregationBuilders.terms("maximoNumPlazas").field("Caracteristicas.NumPlazas"));// maximoNumplazasTypes
			
			Query query = nativeSearchQueryBuilder.build();
			SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
			
			Map<String, Aggregation> aggs = result.getAggregations().asMap();
			
			return aggs;
		}
	

}
