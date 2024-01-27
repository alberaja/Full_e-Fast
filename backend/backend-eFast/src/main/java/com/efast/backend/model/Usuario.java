package com.efast.backend.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@Table(name = "usuarios")
public class Usuario implements Serializable {
	
	// Por Default los genera en la tabla con su "nombre+_" 
//	ej: userName-->"user_name"
//	lastName-->"last_name"
//	usuarioId-->"usuario_id"
//	userRoleEntity(tiene el (name = ))-->"user_role_entity_id"
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId; //en tabla: user_id  	//id
	private String userName;
	
	@Column(name = "last_name", nullable = false)
    @Size(max = 100)
    private String lastName;
	
	private String userEmail;
	private String userPassword;
	private String userPhone;
	
	// aja
//	@ManyToOne//(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_role_entity_id")	
//	private UserRoleEntity userRoleEntity;
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "usuarios_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    private Set<Rol> roles = new HashSet<>();


}
