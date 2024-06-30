package com.elastic.efast.exception;

public class IllegalApiParamException extends RuntimeException {

  private static final long serialVersionUID = 5865753475554930087L;

  public IllegalApiParamException(String s) {
    super(s);
  }
  
}
