package com.elastic.efast.dto.EsClient;

import java.util.List;
import java.util.Map;

import com.elastic.efast.dto.ResponseVehiculosDTO;
import com.elastic.efast.entity.V3EfastEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//ok @JsonInclude(JsonInclude.Include.NON_DEFAULT)	//.NON_DEFAULT ignorar valores de los primitivos(0, nul...) (quitar props de paginador en /vehiculoElegido/:id)   
												//.NON_NULL no devolver el aggs si es null. (Devolver solo aggregates si no ha seleccionado 1 vehiculo concreto)
public class VehiculosQueryResponse {

    private List<ResponseVehiculosDTO> vehiculos; //products  TODO: dejar vehiculos; //private List<V3EfastEntity> products;
    private Map<String, List<Map<String, Object>>> aggs;
    //aja: del productinventory: private List<AggregationDetails> aggs;
    
    // Paginador de resultados    
    private double totalHits;   
    private double totalPages;    
}
