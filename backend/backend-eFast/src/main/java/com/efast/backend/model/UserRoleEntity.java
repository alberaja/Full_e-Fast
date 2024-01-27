//package com.efast.backend.model;
//
//
//
//import java.util.Set;
//
//import com.efast.backend.model.enums.UserRoleEnum;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import jakarta.persistence.Inheritance;
//import jakarta.persistence.InheritanceType;
//import jakarta.persistence.OneToMany;
//
//// aja: jakarta o usar javax . ej: javax.persistence.Entity;
//
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Data
//@Entity
////@Inheritance(strategy = InheritanceType.JOINED)  //AJA
//@Table(name = "roles")
//public class UserRoleEntity {
//	@Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	private UserRoleEnum role;
//	
//	//aja
//	@OneToMany(mappedBy = "userRoleEntity")
//    private Set<Usuario> user;
//
//    @Enumerated(EnumType.STRING)
//    public UserRoleEnum getRole() {
//        return role;
//    }
//
//
//}
