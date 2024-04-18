package com.efast.backend.model;

import java.io.Serializable;

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
//@IdClass(ReservaId.class)  
//@ToString
@Entity
@Table(name = "reservas")

public class Reserva implements Serializable {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "reserva_id")
	    private Long reservaId;

//	    @ManyToOne
//	    @JoinColumn(name = "conductor_id")
//	    private Conductor conductor;
//
//	    @ManyToOne // muchas instancias de la entidad Reserva pueden estar asociadas con una sola instancia de la entidad Vehiculo.
//	    @JoinColumn(name = "vehicle_id", nullable = false, columnDefinition = "BIGINT default 0")  // especificar la columna en la tabla de la entidad Reserva que contendrá el identificador del vehículo asociado
//	    private Vehiculo vehicle;
	 	@ManyToOne
	    @JoinColumn(name = "vehiculo_id" /*, nullable = false*/)
	    private Vehiculo  vehiculoId;  //Set<Vehiculo>. necesario set para poder usarlo luego al hacer .save(entidad)

	    @ManyToOne
	    //@GeneratedValue(strategy = GenerationType.IDENTITY)
	    @JoinColumn(name = "conductor_id" /*, nullable = false*/)
	    private Conductor conductorId; // Set<Conductor>
	    
	    @Column(name = "Comentarios")
	    private String comentarios;

//	    @CreationTimestamp
	    @Column(name = "fechaHora_Ini")
	    private String fechaHoraIni; //Timestamp
	    
	    @Column(name = "fechaHora_Fin")
	    private String fechaHoraFin;
	    
	    @Column(name = "ciudades_Vehiculo")
	    private String ciudadesVehiculo;
	    
	    @Column(name = "ciudades_DevolverVehiculo")
	    private String ciudadesDevolverVehiculo;

	    @Column(name = "numero_dias")
	    private Integer numeroDias;

	    @Column(name = "precio_por_dia")
	    private Double precioPorDia;

	    @Column(name = "total_reserva")
	    private Double totalReserva;

	
//	    @Data
//	    class ReservaId implements java.io.Serializable {
//	        private Integer vehiculoId;
//	        private String conductorId;
//	    }

}
