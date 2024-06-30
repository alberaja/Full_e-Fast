package com.elastic.efast.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.elastic.efast.entity.V3EfastEntity;

@Repository
public interface ElasticEfastRepository extends ElasticsearchRepository<V3EfastEntity, String> {

//
//	@Query(value = """
//			{
//			    "bool": {
//			        "must": [
//			            {
//			                "range": {
//			                    "firstReleaseDate": {
//			                        "lt": "?0"
//			                    }
//			                }
//			            }
//			        ]
//			    }
//			}
//			      """)
//	List<Car> customQuery(LocalDate dateParam);

	//@Query("{\"bool\": {\"must\": [{\"range\": {\"dateIni\": {\"gte\": \"?0\"}}}, {\"range\": {\"dateFin\": {\"lte\": \"?1\"}}}]}}")
	@Query("{\"bool\": {\"must\": [{\"range\": {\"FechaIni\": {\"lte\": \"?0\"}}}, {\"range\": {\"FechaFin\": {\"gte\": \"?1\"}}}]}}")
	List<V3EfastEntity> findByDateIniBetween(String dateIni, String dateFin);  // LocalDate, LocalDate

	//1ero Pegar el Escaped en linea comentada para que no añada \ de mas. luego descomentarla.
	// {"bool":{"should":[{"multi_match":{"query":"?0","type":"bool_prefix","fields":["CiudadesVehiculo","CiudadesVehiculo._2gram","CiudadesVehiculo._3gram"]}},{"term":{"Alquilable":"S"}},{"fuzzy":{"CiudadesVehiculo":{"value":"?0","fuzziness":"3"}}}]}}
	// OLD:  ESCAPED sin \ extras de sts: {\"bool\":{\"should\":[{\"multi_match\":{\"query\":\"?0\",\"type\":\"bool_prefix\",\"fields\":[\"CiudadesVehiculo\",\"CiudadesVehiculo._2gram\",\"CiudadesVehiculo._3gram\"]}},{\"term\":{\"Alquilable\":\"S\"}},{\"fuzzy\":{\"CiudadesVehiculo\":{\"value\":\"?0\",\"fuzziness\":\"3\"}}}]}}
	//OLD: @Query("{\"bool\":{\"should\":[{\"multi_match\":{\"query\":\"?0\",\"type\":\"bool_prefix\",\"fields\":[\"CiudadesVehiculo\",\"CiudadesVehiculo._2gram\",\"CiudadesVehiculo._3gram\"]}},{\"term\":{\"Alquilable\":\"S\"}},{\"fuzzy\":{\"CiudadesVehiculo\":{\"value\":\"?0\",\"fuzziness\":\"2\"}}}]}}")
	//ok solo para CiudadesVehiculo: @Query("{\"bool\":{\"must\":[{\"term\":{\"Alquilable\":\"S\"}}],\"should\":[{\"multi_match\":{\"query\":\"?0\",\"type\":\"bool_prefix\",\"fields\":[\"CiudadesVehiculo\",\"CiudadesVehiculo._2gram\",\"CiudadesVehiculo._3gram\"]}},{\"fuzzy\":{\"CiudadesVehiculo\":{\"value\":\"?0\",\"fuzziness\":\"auto\"}}}]}}")
	@Query("{\"bool\":{\"must\":[{\"term\":{\"Alquilable\":\"S\"}}],\"should\":[{\"multi_match\":{\"query\":\"?0\",\"type\":\"bool_prefix\",\"fields\":[\"?1\",\"?1._2gram\",\"?1._3gram\"]}},{\"fuzzy\":{\"?1\":{\"value\":\"?0\",\"fuzziness\":\"auto\"}}}]}}")
	List<V3EfastEntity> findByCityNameContains(String name, String fieldName, Pageable pageable);  // LocalDate, LocalDate
	
//	@Query("{\"bool\":{\"must\":[{\"term\":{\"Alquilable\":\"S\"}}],\"should\":[{\"multi_match\":{\"query\":\"?0\",\"type\":\"bool_prefix\",\"fields\":[\"?1\",\"?1._2gram\",\"?1._3gram\"]}},{\"fuzzy\":{\"?1\":{\"value\":\"?0\",\"fuzziness\":\"auto\"}}}], \"filter\": [{ \"prefix\": { \"?1\": \"?0\" }}]}}") 
//	List<V3EfastEntity> findByCityNameContainsPageable(String name, String fieldName, Pageable pageable);
	
	@Query("{\"bool\": {\"should\": [{\"multi_match\": {\"query\": \"?0\", \"type\": \"bool_prefix\", \"fields\": [\"CiudadesDevolverVehiculos\", \"CiudadesDevolverVehiculos._2gram\", \"CiudadesDevolverVehiculos._3gram\"]}}, {\"fuzzy\": {\"CiudadesDevolverVehiculos\": {\"value\": \"?0\", \"fuzziness\": \"auto\"}}}]}}")//@Query("{\"bool\": {\"should\": [{\"match\": {\"CiudadesDevolverVehiculos\": \"?0\"}}, {\"prefix\": {\"CiudadesDevolverVehiculos\": \"?0\"}}]}}")
    List<V3EfastEntity> findByCiudadesDevolverVehiculosStartingWith(String nombre, Pageable pageable);

	// ---------
	@Query("{\"bool\": {\"must\": [{\"term\": {\"Alquilable\": \"S\"}}]}}")  // @Query("{\"bool\": {\"must\": [{\"term\": {\"Alquilable\": \"S\"}}]}, \"sort\": [{\"CiudadesVehiculo.keyword\": {\"order\": \"asc\"}}]}")
	List<V3EfastEntity> findAllByAlquilable(Pageable pageable);
	
	@Query("{\"bool\": {\"must\": [{\"term\": {\"Alquilable\": \"S\"}}], \"filter\": [{\"match\": {\"CiudadesVehiculo\": \"?0\"}}]}}")
    List<V3EfastEntity> findEntitiesByCiudadesVehiculo(String nombreCiudadesVehiculo, Pageable pageable);
}
