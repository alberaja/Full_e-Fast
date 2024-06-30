package com.elastic.efast.util;

public enum TipoVehiculoEnum {
	BEV("BEV", "100% Eléctrico"), SHEV("SHEV", "Híbrido Puro"), PHEV("PHEV", "Híbrido Enchufable"),
	HEV("HEV", "Híbrido No Enchufable"), MHEV("MHEV", "Híbrido Ligero");

	private final String clave;
	private final String valor;

	private TipoVehiculoEnum(String clave, String valor) {
        this.clave = clave;
        this.valor = valor;
    }

	public String getClave() {
		return clave;
	}

	public String getValor() {
		return valor;
	}
}
