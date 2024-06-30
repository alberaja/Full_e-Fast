package com.elastic.efast.entity;


import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.PropertyMapper.Source;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.annotations.MultiField;

import com.elastic.efast.entity.subclass.Caracteristicas;
import com.elastic.efast.entity.subclass.Extras;
import com.elastic.efast.entity.subclass.GeoOficina;
import com.elastic.efast.entity.subclass.Precio;
import com.elastic.efast.entity.subclass.Seguro;
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
import lombok.ToString;

// varios mapeos de prueba
@Document(indexName = "vehiculos-efast-random-collection")//vehiculos-efast-random //vehiculos-efast-random-collection //ok vehiculos-efastmuchos   //ok vehiculos-efast   //ok "vehiculos-v3-mappingv2defltmejorado")
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
public class V3EfastEntity {

    @Id
    private String id;
    
    // @JsonProperty("Alquilable") // para generar el vehiculos-efast-random-collection. Lo usa Jackson para serializar y deserializar objetos
    @Field(name = "Alquilable", type = FieldType.Keyword)
    private String alquilable;
    
//    Para mostrar su caracteristicas separadas como atributos independientes usar:
//    @JsonUnwrapped
//    private Engine engine;
    
    // @JsonProperty("Caracteristicas")
    @Field(name = "Caracteristicas", type = FieldType.Object)
    private List<Caracteristicas> caracteristicas;	   //type [java.util.LinkedHashMap<?, ?>]

    @Field(name = "CiudadesDevolverVehiculos", type = FieldType.Text)	//    @Field(type = FieldType.Keyword)
    private ArrayList<String> ciudadesDevolverVehiculos;
//
    // @JsonProperty("CiudadesVehiculo")
    @Field(name = "CiudadesVehiculo", type = FieldType.Text)
   // @MultiField(mainField = @Field(type = FieldType.Keyword, name = "CiudadesVehiculo")) //,
    //otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
    private ArrayList<String> ciudadesVehiculo;
 
      // @JsonProperty("Extras")
      //@JsonUnwrapped   //    @Field(type = FieldType.Object)
	  @Field(name = "Extras", type = FieldType.Object)
	  private List<Extras> extras;

      // @JsonProperty("FechaFin")
	  @Field(name="FechaFin", type = FieldType.Date, format = DateFormat.date_optional_time)  //date_optional_time//@Field(type = FieldType.Date, format = "dd-MM-yyyy'T'HH:mm")
	  private String fechaFin;
//
      // @JsonProperty("FechaIni")
	  @Field(name= "FechaIni", type = FieldType.Date, format = DateFormat.date_hour_minute)
	  private String fechaIni;

      // @JsonProperty("GeoOficina")
	  //@JsonUnwrapped //@JsonUnwrapped   //    @GeoPointField
	  @Field(name = "GeoOficina")
	  private GeoOficina geoOficina;   //private GeoOficina GeoOficina;
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

      // @JsonProperty("ImagenURL")
	@Field(name = "ImagenURL", type = FieldType.Keyword)
	private String imagenURL;
	  
    // @JsonProperty("MarcaVehiculo")
    @Field(name = "MarcaVehiculo", type = FieldType.Keyword)
    private String marcaVehiculo;

    // @JsonProperty("ModeloVehiculo")
    @Field(name = "ModeloVehiculo", type = FieldType.Keyword)
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
    @Field(name = "Precio", type = FieldType.Object)
    private List<Precio> precio;
    
    // @JsonProperty("TipoVehiculo")
    @Field(name = "TipoVehiculo", type = FieldType.Keyword)
    private String tipoVehiculo;
    
    // @JsonProperty("Seguro")
    @Field(name = "Seguro", type = FieldType.Object)
    private List<Seguro> seguro;
   
}
