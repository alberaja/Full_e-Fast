package com.elastic.efast.util;

public final class Constantes {

    // Constantes para el manejo de roles de usuario
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";

    // Constantes para el manejo de URLs de la aplicación
//    public static final String URL_HOME = "/";
//    public static final String URL_LOGIN = "/login";
//    public static final String URL_ADMIN = "/admin";
//    public static final String URL_USER = "/user";

    // Constantes para el manejo de mensajes de error
    public static final String ERROR_GENERICO = "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.";

    // Constantes para el manejo de aggregates
    public static final String QUANTITY = "quantity";
    public static final String AVAILABLE = "available";
    public static final String VALUE = "value";
    public static final String VALUE_HUMAN = "valueHuman";
    // SPANISH
    public static final String DISPONIBLE = "disponible"; 	   //available
    public static final String NUMVEHICULOS = "numVehiculos"; //numVehicles
    public static final String VALOR = "valor";			   //value
    public static final String VALOR_HUMANO = "valorHumano";	  //valueHuman

    
    // Constructor privado para evitar la instanciación de la clase
    private Constantes() {
        throw new AssertionError();
    }
}
