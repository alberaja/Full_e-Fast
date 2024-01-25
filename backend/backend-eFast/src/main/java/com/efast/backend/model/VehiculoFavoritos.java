//package com.efast.backend.model;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "vehiculosFav")
//
//public class VehiculoFavoritos {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long idFav;
//	
//	@ManyToOne //aja(fetch = FetchType.LAZY)    By default @ManyToOne loads the referenced entity immediately via eager fetching. This should be changed to FetchType.LAZY to avoid oversized queries from Hibernate
//	//@JoinColumn(name = "vehicleId")
//	private Long vehicleFavId;//productId
//	
//	@ManyToOne
//	@JoinColumn(name = "userId")
//	private Usuario user;
//
//
//
//	// @OneToMany(mappedBy = "product")
//	// private List<Order> orders;
//
//	public Long getvehicleId() {
//		return vehicleFavId;
//	}
//
//	public void setvehicleFavId(Long vehicleFavId) {
//		this.vehicleFavId = vehicleFavId;
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
//	public Long getIdFav() {
//		return idFav;
//	}
//
//	public void setIdFav(Long idFav) {
//		this.idFav = idFav;
//	}
//
//	
//	public VehiculoFavoritos(Long idfav, Long vehicleFavId, Usuario user) {  //String vehicleName, String vehicleDescription, BigDecimal price, String imageURI,Long quantity,
//		super();
//		this.idFav = idfav;
//		this.vehicleFavId = vehicleFavId;
//		this.user = user;
//	}
//
//	public VehiculoFavoritos() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//}


