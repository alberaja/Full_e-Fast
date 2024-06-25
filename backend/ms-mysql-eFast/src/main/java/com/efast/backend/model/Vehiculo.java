package com.efast.backend.model;

import java.io.Serializable;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "vehiculos")

public class Vehiculo implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Descomentar para añadir tabla de VehiculosFavoritos   @OneToMany(mappedBy = "vehicleFavId")
	//@Column(name = "vehicle_id", nullable = false, columnDefinition = "BIGINT default 0")
	private Long vehiculo_id;//vehiculo_id; vehicle_id

	@Column(length = 100, nullable = false) // length: Longitud máxima de 1000 caracteres. evitar error 'DataIntegrityViolationException ' insert largo
	private String vehicleName;//productName

	@Column
	private String vehicleDescription;//productDescription

	@Column(nullable = false)
	private Double price;

	@Column
	private String imageURI;
	@Column
	private int quantity;
	
	@Column
	private boolean alquilable;

//	 @OneToMany(mappedBy = "vehiculo_id")
//	 private List<Reserva> reservas;
	 
//	 @OneToMany(mappedBy = "vehicleFavId")
//	 private List<VehiculoFavorito> vehiculosFavoritos;
		// un vehículo puede tener como máximo una reserva asociada. Una reserva solo puede estar asociada con un único vehículo.
	 	@OneToOne(mappedBy = "vehiculoId")		//nombre variable de Java
	    private Reserva reserva;
	    
	 	@ManyToMany(fetch = FetchType.LAZY)
	    @JoinTable(name = "vehiculos_favoritos",
	            joinColumns = @JoinColumn(name = "vehiculo_id"),
	            inverseJoinColumns = @JoinColumn(name = "conductor_id"))
	    private Set<Conductor> conductoresFavoritos;
}
