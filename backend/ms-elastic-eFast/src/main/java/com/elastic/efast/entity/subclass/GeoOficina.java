package com.elastic.efast.entity.subclass;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonNaming(value = PropertyNamingStrategies.UpperCamelCaseStrategy.class)
public class GeoOficina {

    @GeoPointField
    private Coordinates coordinates;

    @Data
    @AllArgsConstructor
    public static class Coordinates {

        @Field(type = FieldType.Double)
        private double lat;

        @Field(type = FieldType.Double)
        private double lon;

    }
}