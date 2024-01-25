package com.efast.backend.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "usuarios")
public class Usuario implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;//id
	private String userName;
	
	@Column(name = "last_name", nullable = false)
    @Size(max = 100)
    private String lastName;
	
	private String userEmail;
	private String userPassword;
	private String userPhone;
	
	// aja
	@ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_role_entity_id")
	//private List<UserRoleEntity> roles = new ArrayList<>();
	private UserRoleEntity userRoleEntity;

//	public Long getId() {
//		return userId;
//	}
//
//	public void setId(Long userId) {
//		this.userId = userId;
//	}
//
//	public String getUserName() {
//		return userName;
//	}
//
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}
//
//	public String getUserEmail() {
//		return userEmail;
//	}
//
//	public void setUserEmail(String userEmail) {
//		this.userEmail = userEmail;
//	}
//
//	public String getUserPassword() {
//		return userPassword;
//	}
//
//	public void setUserPassword(String userPassword) {
//		this.userPassword = userPassword;
//	}
//
//	public String getUserPhone() {
//		return userPhone;
//	}
//
//	public void setUserPhone(String userPhone) {
//		this.userPhone = userPhone;
//	}
	
	//aja
//	@ManyToMany(fetch = FetchType.EAGER)
//    public List<UserRoleEntity> getRoles() {
//        return roles;
//    }
//
//    public void setRoles(List<UserRoleEntity> roles) {
//        this.roles = roles;
//    }
	
//	public UserRoleEntity getUserRoleEntity() {
//        return userRoleEntity;
//    }
//
//    public void setUserRoleEntity(final UserRoleEntity userRoleEntity) {
//        this.userRoleEntity = userRoleEntity;
//    }
//	
//
//	public Usuario(Long userId, String userName, String userEmail, String userPassword, String userPhone, UserRoleEntity userRoleEntity) { //List<UserRoleEntity> roles
//		super();
//		this.userId = userId;
//		this.userName = userName;
//		this.userEmail = userEmail;
//		this.userPassword = userPassword;
//		this.userPhone = userPhone;
//		//this.roles = roles;
//		this.userRoleEntity = userRoleEntity;
//	}
	

//	public Usuario() {
//		super();
//		// TODO Auto-generated constructor stub
//	}

}
