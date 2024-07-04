package com.efast.backend.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "conductores")
public class Conductor implements Serializable {
	
	// Por Default los genera en la tabla con su "nombre+_" 
//	ej: userName-->"user_name"
//	lastName-->"last_name"
//	usuarioId-->"usuario_id"
//	userRoleEntity(tiene el (name = ))-->"user_role_entity_id"
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "conductor_id")
	    private Long conductorId;

	    @Column(name = "Nombre")
	    private String nombre;

	    @Column(name = "Apellidos", nullable = false)
	    @Size(max = 100)
	    private String apellidos;

	    @NaturalId
	    @Column(name = "DNI")
	    private String dni;

	    @Column(name = "Telefono")
	    private Integer telefono;

	    @Column(name = "Email")
	    private String email;

//	    @Column(name = "Comentarios")
//	    private String comentarios;
	
	    @OneToMany(mappedBy = "conductorId", cascade = CascadeType.ALL)  //nombre variable de Java
	    @JsonBackReference		// NO debe ser serializada.	
	    private List<Reserva> reservas;
	// aja
//	@ManyToOne//(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_role_entity_id")	
//	private UserRoleEntity userRoleEntity;
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "conductores_roles",
        joinColumns = @JoinColumn(name = "conductor_id"),
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    private Set<Rol> roles = new HashSet<>();


//	@ManyToMany
//    @JoinTable(name = "conductores_vehiculos_favoritos",
//        joinColumns = @JoinColumn(name = "conductor_id"),
//        inverseJoinColumns = @JoinColumn(name = "vehiculo_id")
//    )
//    private List<Vehiculo> vehiculosFavoritos;
}
