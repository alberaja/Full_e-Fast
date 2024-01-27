package com.efast.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.efast.backend.model.VehiculoFavorito;

@Repository
public interface VehiculoFavRepository extends JpaRepository<VehiculoFavorito, Long> {
	// Mismas querys de <> formas
	// Consulta JPQL 
					//@Param("nombreUsuario")
	  @Query("SELECT vf FROM VehiculoFavorito vf JOIN vf.user u WHERE u.userName = :nombreUsuario")
	    List<VehiculoFavorito> findByNombreUsuario( String nombreUsuario);
	  //@Query("SELECT vf FROM VehiculoFavorito vf JOIN vf.usuario u WHERE u.nombre = :nombreUsuario")
	  
	// Consulta Nativa      TO DO:  hacer JOIN a tabla vehiculos
	  @Query(value = "SELECT vf.*  " 
			  		+ "FROM efast.vehiculos_fav vf " +
	            "JOIN usuarios u ON vf.user_id = u.user_id " +
	            "WHERE u.user_name = :nombreUsuario", nativeQuery = true)
	    List<VehiculoFavorito> findByNombreUsuarioNativa( String nombreUsuario);
	  
}
