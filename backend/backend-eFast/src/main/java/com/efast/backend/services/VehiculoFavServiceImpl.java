package com.efast.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efast.backend.model.Vehiculo;
import com.efast.backend.model.VehiculoFavorito;
import com.efast.backend.repository.VehiculoFavRepository;
import com.efast.backend.repository.VehiculoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VehiculoFavServiceImpl implements VehiculoFavService {
    @Autowired
    private VehiculoFavRepository vehiculoFavRepository;


    public List<VehiculoFavorito> getVehiculoFavByUserName(String nombreUsuario) {
        return vehiculoFavRepository.findByNombreUsuarioNativa(nombreUsuario);
    }
}
