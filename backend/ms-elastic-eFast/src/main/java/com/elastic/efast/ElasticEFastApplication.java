package com.elastic.efast;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/***************
 * @author Alberto Jimenez Arregui
 * El proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, 
 * en el Grado en Ingeniería Informática de UNIR.
****************/

@SpringBootApplication
// If we don’t use @Configuration in the POJO, then we need to add @EnableConfigurationProperties(ConfigProperties.class) in the main Spring application class to bind the properties into the POJO.
//@EnableConfigurationProperties(ConfigProperties.class)
public class ElasticEFastApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElasticEFastApplication.class, args);

	}

//	@PostConstruct
//	public void init() {
//	}

}
