package com.elastic.efast.entity.old;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.PropertyMapper.Source;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.annotations.MultiField;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
// ! import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// varios mapeos de prueba
@Document(indexName = "vehiculos-v3-mappingv2defltmejorado")
// https://www.baeldung.com/jackson-advanced-annotations
// SNAKE_CASE: All letters are lowercase with underscores as separators between name elements, e.g. snake_case.
// SNAKE_CASE: modelo_vehiculo
// SnakeCaseStrategy  : ModeloVehiculo
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@JsonInclude(value = JsonInclude.Include.NON_EMPTY)
public class V3EfastEntityOldOK {

    @Id
    private String id;
    
    @Field(type = FieldType.Keyword)
    private String Alquilable;
    
//    Para mostrar su caracteristicas separadas como atributos independientes usar:
//    @JsonUnwrapped
//    private Engine engine;
    

//    @Field(type = FieldType.Object)
//    private List<Caracteristicas> Caracteristicas;	   //type [java.util.LinkedHashMap<?, ?>]

//    @Field(type = FieldType.Keyword)
//    private ArrayList<String> CiudadesDevolverVehiculos;
//
    //@Field(type = FieldType.Text)
   // @MultiField(mainField = @Field(type = FieldType.Keyword, name = "CiudadesVehiculo")) //,
    //otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
    private ArrayList<String> CiudadesVehiculo;
 
      //@JsonUnwrapped   //    @Field(type = FieldType.Object)
//    private Extras Extras;

	  @Field(type = FieldType.Date, format = DateFormat.date_optional_time)  //date_optional_time//@Field(type = FieldType.Date, format = "dd-MM-yyyy'T'HH:mm")
	  private String FechaFin;
//
	  @Field(type = FieldType.Date, format = DateFormat.date_hour_minute)
	  private String FechaIni;

	  //@JsonUnwrapped //@JsonUnwrapped   //    @GeoPointField
	  private GeoOficina GeoOficina;   //private GeoOficina GeoOficina;
//      @GeoPointField
//      private Map<String, Map<String, Double>> geoOficina;

//    @Field(type = FieldType.Date, format = DateFormat.hour_minute)
//    private String HoraFin;
//
//    @Field(type = FieldType.Date, format = DateFormat.hour_minute) //format = "HH:mm")
//    private String HoraIni;
//
//    @Field(type = FieldType.Text)
//    private String ImagenURL;
//
//    @Field(type = FieldType.Date, format = DateFormat.date_optional_time)//?
//    private String Last_Updated;
//
//    @GeoPointField
//    private String LocsVehiculo;

    @Field(type = FieldType.Keyword)
    private String MarcaVehiculo;

    @Field(type = FieldType.Keyword)
    private String ModeloVehiculo;

    @Field(type = FieldType.Search_As_You_Type)
    private String ModeloyMarcaVehiculo;

//    @Field(type = FieldType.Object)
//    private Precio Precio;

    @Field(type = FieldType.Keyword)
    private String TipoVehiculo;

    // Getters y setters
    

//    public static class Caracteristicas {
//        public int getAutonomiaKm() {
//			return AutonomiaKm;
//		}
//		public void setAutonomiaKm(int autonomiaKm) {
//			AutonomiaKm = autonomiaKm;
//		}
//		public int getAño() {
//			return Año;
//		}
//		public void setAño(int año) {
//			Año = año;
//		}
//		public String getCajaCambio() {
//			return CajaCambio;
//		}
//		public void setCajaCambio(String cajaCambio) {
//			CajaCambio = cajaCambio;
//		}
//		public String getDescripcion() {
//			return Descripcion;
//		}
//		public void setDescripcion(String descripcion) {
//			Descripcion = descripcion;
//		}
//		public boolean isEtiquetaECO() {
//			return EtiquetaECO;
//		}
//		public void setEtiquetaECO(boolean etiquetaECO) {
//			EtiquetaECO = etiquetaECO;
//		}
//		public int getLitros() {
//			return Litros;
//		}
//		public void setLitros(int litros) {
//			Litros = litros;
//		}
//		public long getMaximodeKm() {
//			return MaximodeKm;
//		}
//		public void setMaximodeKm(long maximodeKm) {
//			MaximodeKm = maximodeKm;
//		}
//		public int getNumeroBolsasmaletero() {
//			return NumeroBolsasmaletero;
//		}
//		public void setNumeroBolsasmaletero(int numeroBolsasmaletero) {
//			NumeroBolsasmaletero = numeroBolsasmaletero;
//		}
//		public int getNumplazas() {
//			return Numplazas;
//		}
//		public void setNumplazas(int numplazas) {
//			Numplazas = numplazas;
//		}
//		public String getTipoVehiculo() {
//			return TipoVehiculo;
//		}
//		public void setTipoVehiculo(String tipoVehiculo) {
//			TipoVehiculo = tipoVehiculo;
//		}
//		@Field(type = FieldType.Integer)
//        private int AutonomiaKm;
//        @Field(type = FieldType.Integer)
//        private int Año;
//        @Field(type = FieldType.Keyword)
//        private String CajaCambio;
//        @Field(type = FieldType.Text)
//        private String Descripcion;
//        @Field(type = FieldType.Boolean)
//        private boolean EtiquetaECO;
//        @Field(type = FieldType.Integer)
//        private int Litros;
//        @Field(type = FieldType.Long)
//        private long MaximodeKm;
//        @Field(type = FieldType.Integer)
//        private int NumeroBolsasmaletero;
//        @Field(type = FieldType.Integer)
//        private int Numplazas;
//        @Field(type = FieldType.Text)
//        private String TipoVehiculo;
//    }
//
//    public static class Extras {
//        @Field(type = FieldType.Integer)
//        private int ExenciondeFranquicia;
//        @Field(type = FieldType.Boolean)
//        private boolean GPS;
//        @Field(type = FieldType.Boolean)
//        private boolean OpcionSeguroTodoRiesgo;
//        @Field(type = FieldType.Boolean)
//        private boolean ProteccionenCarretera;
//        @Field(type = FieldType.Boolean)
//        private boolean SillaBebe;
//    }
//
//    public static class Precio {
//        @Field(type = FieldType.Boolean)
//        private boolean CancelacionGratis;
//        @Field(type = FieldType.Boolean)
//        private boolean OfertaEspecial;
//        @Field(type = FieldType.Integer)
//        private int Por1DiaEuros;
//        @Field(type = FieldType.Integer)
//        private int PrecioOferta;
//    }
//
    @Data
    @AllArgsConstructor
    public class GeoOficina {

        @GeoPointField
        private Coordinates coordinates;

        @Data
        @AllArgsConstructor
        public static class Coordinates {

            @Field(type = FieldType.Double)
            private double lat;

            @Field(type = FieldType.Double)
            private double lon;

        }
    }
}
