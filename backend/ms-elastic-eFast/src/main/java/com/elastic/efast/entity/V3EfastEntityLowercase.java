package com.elastic.efast.entity;


import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.elastic.efast.entity.subclass.GeoOficina;
import com.elastic.efast.entity.subclass.Precio;
import com.elastic.efast.entity.subclass.Seguro;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.CaracteristicasUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.ExtrasUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.PrecioUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.SeguroUppercase;
import com.fasterxml.jackson.annotation.JsonInclude;
// ! import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// varios mapeos de prueba
@Document(indexName = "vehiculos-efast-random-collection")		//vehiculos-efast-random-collection //ok vehiculos-efastmuchos   //ok vehiculos-efast   //ok "vehiculos-v3-mappingv2defltmejorado")
// https://www.baeldung.com/jackson-advanced-annotations
// SNAKE_CASE: All letters are lowercase with underscores as separators between name elements, e.g. snake_case.
// SNAKE_CASE: modelo_vehiculo
// SnakeCaseStrategy  : ModeloVehiculo
@JsonNaming(value = PropertyNamingStrategies.UpperCamelCaseStrategy.class) //@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)  aplica formato marca_vehiculo, modelo_vehiculo ...
//@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(value = JsonInclude.Include.NON_EMPTY)
	// = que V3EfastEntity pero para recuperar las propiedades de la entidad en minusculas, ya que los inserto en minusculas desde el generador automatico de /random-collection-efast
public class V3EfastEntityLowercase {

    @Id
    private String id;
    
    // @JsonProperty("Alquilable") // para generar el vehiculos-efast-random-collection. Lo usa Jackson para serializar y deserializar objetos
    //@Field(name = "Alquilable", type = FieldType.Keyword)
    private String alquilable;
    
//    Para mostrar su caracteristicas separadas como atributos independientes usar:
//    @JsonUnwrapped
//    private Engine engine;
    
    // @JsonProperty("Caracteristicas")
    //@Field(name = "Caracteristicas", type = FieldType.Object)
    private List<CaracteristicasUppercase> caracteristicas;	   //type [java.util.LinkedHashMap<?, ?>]

//    @Field(type = FieldType.Keyword)
    private /*ArrayList<String> List<String>*/ String ciudadesDevolverVehiculos;
//
    // @JsonProperty("CiudadesVehiculo")
    //@Field(name = "CiudadesVehiculo", type = FieldType.Text)
   // @MultiField(mainField = @Field(type = FieldType.Keyword, name = "CiudadesVehiculo")) //,
    //otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
    private /*ArrayList<String> List<String>*/ String ciudadesVehiculo;
 
      // @JsonProperty("Extras")
      //@JsonUnwrapped   //    @Field(type = FieldType.Object)
    //@Field(name = "Extras", type = FieldType.Object)
	  private List<ExtrasUppercase> extras;

      // @JsonProperty("FechaFin")
	  //@Field(name="FechaFin", type = FieldType.Date, format = DateFormat.date_optional_time)  //date_optional_time//@Field(type = FieldType.Date, format = "dd-MM-yyyy'T'HH:mm")
	  private String fechaFin;
//
      // @JsonProperty("FechaIni")
	  //@Field(name= "FechaIni", type = FieldType.Date, format = DateFormat.date_hour_minute)
	  private String fechaIni;

      // @JsonProperty("GeoOficina")
	  //@JsonUnwrapped //@JsonUnwrapped   //    @GeoPointField
	  //@Field(name = "GeoOficina")
	  private /*Map<String,Double>*/GeoOficina geoOficina;   //ok   private GeoOficina GeoOficina;
//      @GeoPointField
//      private Map<String, Map<String, Double>> geoOficina;

//    @Field(type = FieldType.Date, format = DateFormat.hour_minute)
      private String HoraFin;
//
    //@Field(type = FieldType.Date, format = DateFormat.hour_minute) //format = "HH:mm")
      private String HoraIni;
//
//    @Field(type = FieldType.Text)
//    private String ImagenURL;
//
//    @Field(type = FieldType.Date, format = DateFormat.date_optional_time)//?
    private String lastUpdated;
//
    //@GeoPointField
    private List<Coordinates> locsVehiculo;

      // @JsonProperty("ImagenURL")
	  //@Field(name = "ImagenURL", type = FieldType.Keyword)
	private String imagenURL;
	  
    // @JsonProperty("MarcaVehiculo")
	//@Field(name = "MarcaVehiculo", type = FieldType.Keyword)
    private String marcaVehiculo;

    // @JsonProperty("ModeloVehiculo")
    //@Field(name = "ModeloVehiculo", type = FieldType.Keyword)
    private String modeloVehiculo;

//    @Field(name = "ModeloyMarcaVehiculo", type = FieldType.Search_As_You_Type)
//    private String modeloyMarcaVehiculo;
//    @Transient
//    private String MarcayModeloVehiculo;
//    
//    public void setMarcayModeloVehiculo(String marca, String modelo) {
//        this.MarcayModeloVehiculo = marcaVehiculo + " " + modeloVehiculo	;
//    }
//    
//    public String getMarcayModeloVehiculo() {
//        return this.MarcayModeloVehiculo;
//    }
    
    // @JsonProperty("Precio")
    //@Field(name = "Precio", type = FieldType.Object)
    private List<PrecioUppercase> precio;
    
    // @JsonProperty("TipoVehiculo")
    //@Field(name = "TipoVehiculo", type = FieldType.Keyword)
    private String tipoVehiculo;
    
    // @JsonProperty("Seguro")
    //@Field(name = "Seguro", type = FieldType.Object)
    private List<SeguroUppercase> seguro;
    
    
    
    @Data
    @AllArgsConstructor
    public static class Coordinates {

        @Field(type = FieldType.Double)
        private double lat;

        @Field(type = FieldType.Double)
        private double lon;

    }
   
}
