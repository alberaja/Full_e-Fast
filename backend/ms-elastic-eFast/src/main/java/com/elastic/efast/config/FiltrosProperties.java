package com.elastic.efast.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "filtrosprop")
@Data
public class FiltrosProperties {

    private List<String> transmissionTypes;//== cajaCambio
    private List<String> fuelTypes;//==tiposElectrico
    private List<String> carTypes;//==tiposVehiculo
    private List<String> maximoNumplazasTypes; //==maximoDeKms
    private List<String> brandsVehicle; //marcaVehiculo

    // Getters y setters
}
