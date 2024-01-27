package com.efast.backend.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "vehiculosFav")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})//evitar salga en las respuestas del objeto el valor:  "hibernateLazyInitializer": {}
//@JsonIgnoreProperties(ignoreUnknown = true)
public class VehiculoFavorito  {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idFav;
	
	@ManyToOne //(fetch = FetchType.LAZY) //aja(fetch = FetchType.LAZY)    By default @ManyToOne loads the referenced entity immediately via eager fetching. This should be changed to FetchType.LAZY to avoid oversized queries from Hibernate
	@JoinColumn(name = "vehicle_id")
	//@JsonIgnore   //evitar el fallo de serializacion en Jackson, evita el error  No serializer found for class org.hibernate.proxy.pojo.bytebuddy.ByteBuddyInterceptor and no properties discovered to create BeanSerializer (to avoid exception, disable SerializationFeature.FAIL_ON_EMPTY_BEANS) (through reference chain: java.util.ArrayList[0]->com.efast.backend.model.VehiculoFavorito["vehicleFavId"]->com.efast.backend.model.Vehiculo$HibernateProxy$8Tj5xrCJ["hibernateLazyInitializer"])
	private Vehiculo vehicleFavId;  //Long
	
	@ManyToOne //(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	//@JsonIgnore
	private Usuario user;


}


