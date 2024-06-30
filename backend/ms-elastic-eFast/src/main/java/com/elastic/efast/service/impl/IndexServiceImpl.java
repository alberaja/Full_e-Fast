package com.elastic.efast.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilter;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilterBuilder;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import com.elastic.efast.config.FiltrosProperties;
import com.elastic.efast.dto.ResponseCitiesDTO;
import com.elastic.efast.entity.V3EfastEntity;
import com.elastic.efast.repository.ElasticEfastRepository;
import com.elastic.efast.service.IndexService;
import com.elastic.efast.util.Constantes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
public class IndexServiceImpl implements IndexService{
	
	private final ElasticsearchOperations elasticClient;
	
	@Autowired
	private FiltrosProperties filtrosProp;
	
	@Autowired
	private ElasticEfastRepository efastRepository;

	@Override
	public Map<String, Object> getTiposMarcas() {
		// Valores desde BBDD ES
//		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
//		queryBuilder.must(QueryBuilders.termQuery("Alquilable", "S"));
//		
//		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(queryBuilder);
//
//		// Agregar consulta
//		//nativeSearchQueryBuilder.withQuery(QueryBuilders.termQuery("Alquilable", "S"));			
//
//		// Construir consulta
//		Query query = nativeSearchQueryBuilder.build();
//		SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
//
////		List<Map<String, Object>> aggregates = new ArrayList<>();
//		Map<String, Object> aggregates = new HashMap();
//		
//		 Set<String> marcasUnicas = result.getSearchHits().stream()
//		            .map(hit -> hit.getContent().getMarcaVehiculo())
//		            .collect(Collectors.toSet());
//
//			// aggregates.add(Map.of("marcas_vehiculo_distinct", marcasVehiculos)); //si
//			// fuera List<Map<String, Object>>
////			aggregates.add(Map.of("tiposMarcas", marcasUnicas)); //BrandTypes  //para Map<String, Object> aggregates:   aggregates.put("marcas_vehiculo_distinct", marcasVehiculos);
//		 aggregates.put("tiposMarcas", marcasUnicas);
		
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.filter(QueryBuilders.termQuery("Alquilable", "S"));

        NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder()
                .withQuery(queryBuilder)
                .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("MarcaVehiculo").build())
                .withMaxResults(10000); // Limitar los resultados para evitar grandes volúmenes de datos en una sola solicitud

        Query query = nativeSearchQueryBuilder.build();
        SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);

        Set<String> marcasUnicas = result.getSearchHits().stream()
                .map(hit -> hit.getContent().getMarcaVehiculo())
                .collect(Collectors.toSet());

        Map<String, Object> aggregates = new HashMap<>();
        aggregates.put("tiposMarcas", marcasUnicas);		
		
		return aggregates;		
	}

	@Override
	public Map<String, Object> getTiposVehiculos() {
		List<Map<String, Object>> carTypes = new ArrayList<>();
		filtrosProp.getCarTypes().forEach(carType -> {
	        Map<String, Object> typeDetails = new LinkedHashMap<>();
	        typeDetails.put(Constantes.VALOR, carType); //"value"
	        carTypes.add(typeDetails);
	    });
	    
	    Map<String, Object> result = new LinkedHashMap<>();
	    result.put("tiposVehiculo", carTypes);
	    return result;
	}

	@Override
	public ResponseCitiesDTO getCiudades(String nombre, boolean ciudadesDevolverVehiculos) {
		// List<ElasticProduct> product = service.getAjaByDateIniAndDateFin(dateIniLD,
				// dateFinLD);
				nombre = !nombre.isEmpty() ? nombre.toLowerCase() : "";
				String fieldName= ciudadesDevolverVehiculos ? "CiudadesDevolverVehiculos" : "CiudadesVehiculo";
				System.out.println("fieldName: "+ fieldName+ ", dropOff: "+ ciudadesDevolverVehiculos);
//				String query = "{\\\"bool\\\":{\\\"must\\\":[{\\\"term\\\":{\\\"Alquilable\\\":\\\"S\\\"}}],\\\"should\\\":[{\\\"multi_match\\\":{\\\"query\\\":\\\"?0\\\",\\\"type\\\":\\\"bool_prefix\\\",\\\"fields\\\":[\\\"?1\\\",\\\"?1._2gram\\\",\\\"?1._3gram\\\"]}},{\\\"fuzzy\\\":{\\\"?1\\\":{\\\"value\\\":\\\"?0\\\",\\\"fuzziness\\\":\\\"auto\\\"}}}]}}";
//			    System.out.println("Query findByCityNameContains: " + query);
				//ok List<V3EfastEntity> respList = efastRepository.findByCityNameContains(nombre, fieldName);   //ateIniLD, dateFinLD
				
						// recuperar mas de 10 documentos. maximo de docs a traer
						Pageable pageable = PageRequest.of(0, 51/*10000, Sort.unsorted()*/);
				//		List<V3EfastEntity> respList = efastRepository.findByCityNameContainsPageable(nombre, fieldName, pageable);
				List<V3EfastEntity> respList = efastRepository.findByCityNameContains(nombre, fieldName, pageable);
				
				//ok List<V3EfastEntity> respList = efastRepository.findByCiudadesDevolverVehiculosStartingWith(nombre, pageable);
				
//				ObjectMapper mapper = new ObjectMapper();
		//
//		        // Convertir el JSON en una lista de objetos ResponseCitiesDTO
//		        ResponseCitiesDTO[] ciudadesDTO = mapper.readValue("[" + json + "]", ResponseCitiesDTO[].class);
		//
//		        // Crear un conjunto para almacenar ciudades únicas
//		        Set<String> ciudadesUnicas = new HashSet<>();
		//
//		        // Recorrer los objetos ResponseCitiesDTO y agregar las ciudades al conjunto
//		        for (ResponseCitiesDTO ciudadDTO : ciudadesDTO) {
//		            ciudadesUnicas.addAll(ciudadDTO.getCiudadesVehiculo());
//		        }
		//
//		        // Convertir el conjunto de ciudades únicas a una lista
//		        List<String> ciudadesUnicasList = List.copyOf(ciudadesUnicas);
		//
//		        // Imprimir las ciudades únicas
//		        System.out.println(ciudadesUnicasList);
				
				Set<String> ciudadesUnicas = new HashSet<>();

		        // Recorrer la lista y agregar las ciudades al conjunto
				if(ciudadesDevolverVehiculos) {
						for (V3EfastEntity entidad : respList) {
				            List<String> ciudades = entidad.getCiudadesDevolverVehiculos();
				            ciudadesUnicas.addAll(ciudades);
				        }
				} else {
				        for (V3EfastEntity entidad : respList) {
				            List<String> ciudades = entidad.getCiudadesVehiculo();
				            ciudadesUnicas.addAll(ciudades);
				        }
				}		
							        // Imprimir las ciudades únicas
							//        System.out.println("Ciudades únicas:");
							//        for (String ciudad : ciudadesUnicas) {
							//            System.out.println(ciudad);
							//        }
				// filtrar las ciudades que solo incluyan las que comiencen con la misma letra que la letra inicial de name
		        Set<String> ciudadesFiltradas = new HashSet<>();
		        	// char primeraLetra = Character.toLowerCase(name.charAt(0));
		        // TO DO: en Steams
		        for (String ciudad : ciudadesUnicas) {
		        		//  query methods naming      	efastRepository.findByCiudadesVehiculoContainingIgnoreCase(name); &alquilable
		        	log.info("ciudad: "+ ciudad+"-" + "Inputname: "+nombre);
		        	//permite  mad(Madrid),  goza(Zaragoza),  len, l(Valencia)
		        	if (ciudad.toLowerCase().startsWith(String.valueOf(nombre.charAt(0))) || ciudad.toLowerCase().contains(String.valueOf(nombre/*.charAt(0)*/))){//if (Character.toLowerCase(ciudad.charAt(0)) == primeraLetra) {
		                ciudadesFiltradas.add(ciudad);
		            }
		        }
		        
		        
//		        LevenshteinDistance levenshtein = new LevenshteinDistance();
//		        final String nombreABuscar = nombre;
		        // Filtramos y ordenamos los resultados basándonos en la similitud con el nombre proporcionado
//		        respList.stream()
//		                .filter(entity -> {
//		                	 ArrayList<String> ciudades = entity.getCiudadesDevolverVehiculos();
//		                     for (String ciudad : ciudades) {
//		                         String[] partesCiudad = ciudad.split(",");
//		                         for (String parte : partesCiudad) {
//		                        	 System.out.println("parteeeee" + parte);
//		                             if (levenshtein.apply(parte.toLowerCase(), nombreABuscar.toLowerCase()) <= 5) {
//		                                 ciudadesFiltradas.add(parte.trim()); // Agregar la ciudad filtrada al conjunto
//		                                 return true;
//		                             }
//		                         }
//		                     }
//		                    return false;
//		                })
//		                .collect(Collectors.toList());    
		        
		        
				ResponseCitiesDTO respDTO =ResponseCitiesDTO.builder().ciudadesUnicas/*uniqueCitis*/(ciudadesFiltradas).build(); // ciudadesUnicas
				return respDTO;//respList;
	}

	@Override
	public ResponseCitiesDTO getCiudadesVehiculo() {
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
//		if (tiposElectrico != null && !tiposElectrico.isEmpty() ) { // && tiposElectrico.size() != 1  && !tiposElectrico.get(0).equals("*")) {
//			queryBuilder.must(QueryBuilders.termsQuery("Caracteristicas.TipoVehiculo.keyword", tiposElectrico));
//		}		
//		if (tiposVehiculo != null && !tiposVehiculo.isEmpty()) {
//            queryBuilder.must(QueryBuilders.termsQuery("TipoVehiculo.keyword", tiposVehiculo));
//        }
//		
//		if (marcasVehiculo != null && !marcasVehiculo.isEmpty()) {
//			queryBuilder.must(QueryBuilders.termsQuery("MarcaVehiculo.keyword", marcasVehiculo));
//		}  
		//mejor que queryBuilder.must
		queryBuilder.filter(QueryBuilders.termQuery("Alquilable", "S"));
		
		// recuperar mas de 10 documentos. maximo de docs a traer
		Pageable pageable = PageRequest.of(0, 51);/*, Sort.by("nombre").ascending()); /*10000, Sort.unsorted()*/	
		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder()
				.withQuery(queryBuilder)
				.withSourceFilter(new FetchSourceFilter(new String[] {"CiudadesVehiculo"}, null))  // solo se recuperen los campos necesarios (CiudadesVehiculo), reduciendo la cantidad de datos transferidos 
				.withPageable(pageable);
		
		//ok List<V3EfastEntity> respList = efastRepository.findAllByAlquilable(pageable);
		Query query = nativeSearchQueryBuilder.build();
		SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
		
//		Set<String> ciudadesUnicas = respList.stream()
//							                .flatMap(entity -> entity.getCiudadesVehiculo().stream())
//							                .collect(Collectors.toSet());
		 Set<String> ciudadesUnicas = result.getSearchHits().stream()
	                .flatMap(hit -> hit.getContent().getCiudadesVehiculo().stream())
	                .collect(Collectors.toSet());
        
		ResponseCitiesDTO respDTO = ResponseCitiesDTO.builder().ciudadesUnicas(ciudadesUnicas).build(); // ciudadesUnicas
		return respDTO;
	}

	@Override
	public ResponseCitiesDTO getCiudadesDevolverVehiculos(String nombreCiudadesVehiculo) {
		String[] partesNombreCiudad = nombreCiudadesVehiculo.replace(" ", "").split(",");
//		nombreCiudadesVehiculo = partesNombreCiudad[0];
		// controlar nombres largos: Santa Cruz de Tenerife, Santiago de Compostela...
//		if(nombreCiudadesVehiculo.length() > 9) {
//			nombreCiudadesVehiculo = nombreCiudadesVehiculo.substring(0,9);
//		}
		
		//forma1
//		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
//		queryBuilder.filter(QueryBuilders.termQuery("Alquilable", "S"));
//		queryBuilder.filter(QueryBuilders.matchQuery("CiudadesVehiculo", nombreCiudadesVehiculo));
//
//		Pageable pageable = PageRequest.of(0, 51);/* , Sort.by("nombre").ascending()); /*10000, Sort.unsorted() */
//		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder()
//		        .withQuery(queryBuilder)
//		        .withSourceFilter(new FetchSourceFilterBuilder().withIncludes("MarcaVehiculo").build())
//		        .withPageable(pageable); // Usar paginación para manejar grandes volúmenes de datos
//
//		Query query = nativeSearchQueryBuilder.build();
//		SearchHits<V3EfastEntity> result = elasticClient.search(query, V3EfastEntity.class);
		// Filtrar los resultados para asegurar coincidencias exactas
//      List<V3EfastEntity> filteredResults = result.getSearchHits().stream()
//              .map(hit -> hit.getContent())
//              .filter(entity -> entity.getCiudadesVehiculo().contains(nombreCiudadesVehiculo))
//              .collect(Collectors.toList());
//      
//   // Obtener las ciudades únicas
//      Set<String> ciudadesUnicas = filteredResults.stream()
//              .flatMap(entity -> entity.getCiudadesDevolverVehiculos().stream())
//              .collect(Collectors.toSet());
		
//		 recuperar mas de 10 documentos. default de docs a traer
		Pageable pageable = PageRequest.of(0, 51);/* , Sort.by("nombre").ascending()); /*10000, Sort.unsorted() */		
		List<V3EfastEntity> respList = efastRepository.findEntitiesByCiudadesVehiculo(nombreCiudadesVehiculo, pageable);
		
		//filtrar (controlar ciudades largas) para ajustar las coincidencias
		final String nombreCiudadVehiculo = nombreCiudadesVehiculo;
		
		respList = respList.stream()
		        .filter(entity -> entity.getCiudadesVehiculo().contains(nombreCiudadVehiculo))
		        .collect(Collectors.toList());
		Set<String> ciudadesUnicas = respList.stream()
                .flatMap(entity -> entity.getCiudadesDevolverVehiculos().stream())
                .collect(Collectors.toSet());	

		ResponseCitiesDTO respDTO = ResponseCitiesDTO.builder().ciudadesUnicas(ciudadesUnicas).build(); // ciudadesUnicas
		return respDTO;
	}
	
	

}
