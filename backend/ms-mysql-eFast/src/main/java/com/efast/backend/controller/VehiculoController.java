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
//import com.efast.backend.model.VehiculoFavorito;
//import com.efast.backend.services.VehiculoFavService;
import com.efast.backend.services.VehiculoService;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*" )
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;
    
//    @Autowired
//    private VehiculoFavService vehiculoFavService;

    @GetMapping
    public List<Vehiculo> getAllVehiculos() {
        return vehiculoService.getAllVehiculos();
    }

    @GetMapping("/{vehiculoId}")
    public Vehiculo getVehiculoById(@PathVariable Long vehiculoId) {
        return vehiculoService.getVehiculoById(vehiculoId);
    }
    
//    @GetMapping("/vehiculoFavByUserName/{nombreUsuario}")
//    public List<VehiculoFavorito> getVehiculoFavByUserName(@PathVariable String nombreUsuario) {
//        return vehiculoFavService.getVehiculoFavByUserName(nombreUsuario);
//    }    

    @PostMapping
    public Vehiculo createVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.createVehiculo(vehiculo);
    }
}
