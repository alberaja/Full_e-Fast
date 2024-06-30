package com.elastic.efast.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.elastic.efast.entity.V3EfastEntity;
import com.elastic.efast.entity.subclass.Caracteristicas;
import com.elastic.efast.entity.subclass.Extras;
import com.elastic.efast.entity.subclass.GeoOficina;
import com.elastic.efast.entity.subclass.Precio;
import com.elastic.efast.entity.subclass.Seguro;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
//@JsonInclude(value = JsonInclude.Include.NON_EMPTY)
public class ResponseVehiculosDTO {

    @Id
    private String id;
    
    @Field(name = "Alquilable", type = FieldType.Keyword)
    private String alquilable;
    
//    Para mostrar su caracteristicas separadas como atributos independientes usar:
//    @JsonUnwrapped
//    private Engine engine;

//	mapear aqui(DTO) y en V3EfastEntity los nuevos campos

    @Field(name = "Caracteristicas", type = FieldType.Object)
    private List<Caracteristicas> caracteristicas;	   //type [java.util.LinkedHashMap<?, ?>]

//    @Field(type = FieldType.Keyword)
//    private ArrayList<String> CiudadesDevolverVehiculos;
//
    @Field(name = "CiudadesVehiculo", type = FieldType.Text)
   // @MultiField(mainField = @Field(type = FieldType.Keyword, name = "CiudadesVehiculo")) //,
    //otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
    private ArrayList<String> ciudadesVehiculo;
 
      //@JsonUnwrapped   //    @Field(type = FieldType.Object)
	  @Field(name = "Extras", type = FieldType.Object)
	  private List<Extras> extras;

	  @Field(name="FechaFin", type = FieldType.Date, format = DateFormat.date_optional_time)  //date_optional_time//@Field(type = FieldType.Date, format = "dd-MM-yyyy'T'HH:mm")
	  private String fechaFin;
//
	  @Field(name= "FechaIni", type = FieldType.Date, format = DateFormat.date_hour_minute)
	  private String fechaIni;

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

	@Field(name = "ImagenURL", type = FieldType.Keyword)
	private String imagenURL;
	  
    @Field(name = "MarcaVehiculo", type = FieldType.Keyword)
    private String marcaVehiculo;

    @Field(name = "ModeloVehiculo", type = FieldType.Keyword)
    private String modeloVehiculo;

//    @Field(name = "ModeloyMarcaVehiculo", type = FieldType.Search_As_You_Type)
//    private String modeloyMarcaVehiculo;
//    @Transient
//    concatena los campos marcaVehiculo y modeloVehiculo
    private String marcayModeloVehiculo;
    
    @Field(name = "Precio", type = FieldType.Object)
    private List<Precio> precio;

    @Field(name = "TipoVehiculo", type = FieldType.Keyword)
    private String tipoVehiculo;
    
    @Field(name = "Seguro", type = FieldType.Object)
    private List<Seguro> seguro;
   
}