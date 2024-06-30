package com.elastic.efast.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "miapp")
@Data
public class ConfigProperties {

    private String nombre;
    private String version;
    private String descripcion;

    // paginar vehiculos en /busquedaVehiculos 
    private Integer paginatorSizeVehicles;
}
