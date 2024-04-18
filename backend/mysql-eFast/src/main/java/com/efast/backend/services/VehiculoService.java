package com.efast.backend.services;

import java.util.List;

import com.efast.backend.model.Vehiculo;

public interface VehiculoService {
    List<Vehiculo> getAllVehiculos();
    Vehiculo getVehiculoById(Long vehiculoId);
    Vehiculo createVehiculo(Vehiculo vehiculo);
}