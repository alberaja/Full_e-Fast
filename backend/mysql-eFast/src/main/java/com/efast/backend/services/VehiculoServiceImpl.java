package com.efast.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efast.backend.model.Vehiculo;
import com.efast.backend.repository.VehiculoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VehiculoServiceImpl implements VehiculoService {
    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Override
    public List<Vehiculo> getAllVehiculos() {
        return vehiculoRepository.findAll();
    }

    @Override
    public Vehiculo getVehiculoById(Long vehiculoId) {
        return vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo not found with id: " + vehiculoId));
    }

    @Override
    public Vehiculo createVehiculo(Vehiculo product) {
        return vehiculoRepository.save(product);
    }
}
