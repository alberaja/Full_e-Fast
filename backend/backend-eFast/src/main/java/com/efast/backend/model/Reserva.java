package com.efast.backend.model;

import java.io.Serializable;
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
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
//@ToString
@Entity
@Table(name = "reservas")

public class Reserva implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Usuario user;

	@ManyToOne
	@JoinColumn(name = "vehicle_id")//productId
	private Vehiculo vehicle;//product

	@CreationTimestamp
	private Timestamp orderDate;
	@Column
	private Long quantity;
	@Column
	private String shipAdd;
	@Column
	private String billAdd;
	

	

}
