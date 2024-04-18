package com.efast.backend.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.efast.backend.dto.ErrorDTO;
import com.efast.backend.exception.VehiculoNoAlquilableException;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(VehiculoNoAlquilableException.class)
    //@ResponseStatus(HttpStatus.NOT_FOUND)   //no necessary using the wrapper ResponseEntity<>
	public ResponseEntity<ErrorDTO> getVehiculoNoAlquilableException(VehiculoNoAlquilableException exception) {
		log.error("getVehiculoNoAlquilableException {}", exception.getMessage());
		ErrorDTO error = ErrorDTO.builder()/*.status(HttpStatus.NOT_FOUND)*/.message(exception.getMessage()).build();
		return new ResponseEntity<ErrorDTO>(error, exception.getStatus());
	}
	
}
