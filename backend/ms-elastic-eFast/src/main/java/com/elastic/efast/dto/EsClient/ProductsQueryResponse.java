package com.elastic.efast.dto.EsClient;

import java.util.List;
import java.util.Map;

import com.elastic.efast.entity.V3EfastEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductsQueryResponse {

    private List<V3EfastEntity> vehiculos;//products;
    private Map<String, List<Map<String, Object>>> aggs;
    //aja: del productinventory: private List<AggregationDetails> aggs;

}
