package com.elastic.efast.exception;

import java.time.ZonedDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.elastic.efast.dto.ErrorResponse;

@RestControllerAdvice
public class MyGlobalExceptionHandler {

  private static final Logger LOG = LoggerFactory.getLogger(MyGlobalExceptionHandler.class);
  
  @ExceptionHandler(IllegalApiParamException.class)
  public ResponseEntity<ErrorResponse> handleInvalidBrandException(IllegalApiParamException e) {
    var exceptionMessage = "Exception (global) : " + e.getMessage();
    LOG.warn("{}", exceptionMessage);

    var errorResponse = new ErrorResponse(exceptionMessage, ZonedDateTime.now());

    return new ResponseEntity<>(errorResponse, null, HttpStatus.BAD_REQUEST);
  }

}
