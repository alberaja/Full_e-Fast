package com.elastic.efast.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.elastic.efast.config.ConfigProperties;

@Component
class Inicializador implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private ConfigProperties config;
    
//    @Value("${miapp.nombre}")
//    private String appnombre;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
    	// TO DO: Mostrar spring banner 
//    	System.out.println("appnombre"+ appnombre);
    	
        System.out.println("Nombre: " + config.getNombre());
        System.out.println("Versión: " + config.getVersion());
		System.out.println("Descripción: " + config.getDescripcion());
    }
}
