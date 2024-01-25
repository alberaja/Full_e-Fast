package com.efast.backend.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "reservas")

public class Reserva {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "userId")
	private Usuario user;

	@ManyToOne
	@JoinColumn(name = "vehicleId")//productId
	private Vehiculo vehicle;//product

	@CreationTimestamp
	private Timestamp orderDate;
	@Column
	private Long quantity;
	@Column
	private String shipAdd;
	@Column
	private String billAdd;
	

//	public Timestamp getOrderDate() {
//		return orderDate;
//	}
//
//	public void setOrderDate(Timestamp orderDate) {
//		this.orderDate = orderDate;
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public Usuario getUser() {
//		return user;
//	}
//
//	public void setUser(Usuario user) {
//		this.user = user;
//	}
//
//	public Vehiculo getvehicle() {
//		return vehicle;
//	}
//
//	public void setvehicle(Vehiculo vehicle) {
//		this.vehicle = vehicle;
//	}
//	public Long getQuantity() {
//		return quantity;
//	}
//
//	public void setQuantity(Long quantity) {
//		this.quantity = quantity;
//	}
//
//	public String getShipAdd() {
//		return shipAdd;
//	}
//
//	public void setShipAdd(String shipAdd) {
//		this.shipAdd = shipAdd;
//	}
//
//	public String getBillAdd() {
//		return billAdd;
//	}
//
//	public void setBillAdd(String billAdd) {
//		this.billAdd = billAdd;
//	}
//
//	public Reserva(Long id, Usuario user, Vehiculo vehicle,Long quantity,String shipAdd,String billAdd) {
//		super();
//		this.id = id;
//		this.user = user;
//		this.vehicle = vehicle;
//		this.quantity = quantity;
//		this.shipAdd=shipAdd;
//		this.billAdd=billAdd;
//	}
//
//	public Reserva() {
//		super();
//		// TODO Auto-generated constructor stub
//	}

//	@Override
//	public String toString() {
//		return "Order [id=" + id + ", user=" + user + ", vehicle=" + vehicle + ", orderDate=" + orderDate
//				+ ", quantity=" + quantity + ", shipAdd=" + shipAdd + ", billAdd=" + billAdd + "]";
//	}

	

}
