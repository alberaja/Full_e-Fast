package com.efast.backend.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	@Column(name = "vehicle_id")
	private Long vehicleId;//en tabla: vehicle_id

	@Column(nullable = false)
	private String vehicleName;//productName

	@Column
	private String vehicleDescription;//productDescription

	@Column(nullable = false)
	private BigDecimal price;

	@Column
	private String imageURI;
	@Column
	private Long quantity;

	// @OneToMany(mappedBy = "product")
	// private List<Order> orders;

}
