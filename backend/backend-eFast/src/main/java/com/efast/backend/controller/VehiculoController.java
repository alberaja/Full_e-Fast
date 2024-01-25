package com.efast.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efast.backend.model.Vehiculo;
import com.efast.backend.services.VehiculoService;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*" )
public class VehiculoController {
    @Autowired
    private VehiculoService productService;

    @GetMapping
    public List<Vehiculo> getAllProducts() {
        return productService.getAllVehiculos();
    }

    @GetMapping("/{productId}")
    public Vehiculo getProductById(@PathVariable Long productId) {
        return productService.getVehiculoById(productId);
    }

    @PostMapping
    public Vehiculo createProduct(@RequestBody Vehiculo product) {
        return productService.createVehiculo(product);
    }
}
