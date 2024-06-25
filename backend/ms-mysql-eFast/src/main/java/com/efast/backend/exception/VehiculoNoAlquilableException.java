package com.efast.backend.exception;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VehiculoNoAlquilableException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	private HttpStatus status;
    public VehiculoNoAlquilableException(String message , HttpStatus status){ 
        super(message);
        this.status = status;
    }

	
}
