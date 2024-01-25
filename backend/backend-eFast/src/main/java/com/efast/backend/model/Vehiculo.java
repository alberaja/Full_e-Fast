package com.efast.backend.model;

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

public class Vehiculo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Descomentar para añadir tabla de VehiculosFavoritos   @OneToMany(mappedBy = "vehicleFavId")
	private Long vehicleId;//productId

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

//	public Long getvehicleId() {
//		return vehicleId;
//	}
//
//	public void setvehicleId(Long vehicleId) {
//		this.vehicleId = vehicleId;
//	}
//
//	public String getvehicleName() {
//		return vehicleName;
//	}
//
//	public void setvehicleName(String vehicleName) {
//		this.vehicleName = vehicleName;
//	}
//
//	public String getvehicleDescription() {
//		return vehicleDescription;
//	}
//		
//	public void setvehicleDescription(String vehicleDescription) {
//		this.vehicleDescription = vehicleDescription;
//	}
//	public Long getquantity() {
//		return quantity;
//	}
//	public void setquantity( Long quantity) {
//		this.quantity=quantity;
//	}
//
//	public BigDecimal getPrice() {
//		return price;
//	}
//
//	public void setPrice(BigDecimal price) {
//		this.price = price;
//	}
//
//	public String getImageURI() {
//		return imageURI;
//	}
//
//	public void setImageURI(String imageURI) {
//		this.imageURI = imageURI;
//	}
//
//	public Vehiculo(Long vehicleId, String vehicleName, String vehicleDescription, BigDecimal price, String imageURI,Long quantity) {
//		super();
//		this.vehicleId = vehicleId;
//		this.vehicleName = vehicleName;
//		this.vehicleDescription = vehicleDescription;
//		this.price = price;
//		this.imageURI = imageURI;
//		this.quantity=quantity;
//	}
//
//	public Vehiculo() {
//		super();
//		// TODO Auto-generated constructor stub
//	}

}
