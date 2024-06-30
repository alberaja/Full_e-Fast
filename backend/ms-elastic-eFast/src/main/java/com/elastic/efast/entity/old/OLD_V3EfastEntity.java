package com.elastic.efast.entity.old;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(indexName = "vehiculos-v3-mappingv2defltmejorado", createIndex = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@JsonInclude(value = JsonInclude.Include.NON_EMPTY)
public class OLD_V3EfastEntity {

  @Id
  private String id;
  
  
  
//  @Field(type = FieldType.Keyword, name = "country")
//  private String ciudadesVehiculo;
//
//  @MultiField(mainField = @Field(type = FieldType.Keyword, name = "name"),
//  otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
//  private String tipoVehiculo;

  
//  @MultiField(mainField = @Field(type = FieldType.Keyword, name = "ciudadesVehiculo"),
//  otherFields = @InnerField(suffix = "search", type = FieldType.Search_As_You_Type))
  private String ciudadesVehiculo;

//  @GeoPointField
  private List<Map<String, Double>> locsVehiculo;

//  @GeoPointField
  private Map<String, Map<String, Double>> geoOficina;

//  @Field(type = FieldType.Date, format = DateFormat.date_optional_time)  //??date_optional_time
  private Date fechaIni;

//  @Field(type = FieldType.Date)
  private Date fechaFin;

//  @Field(type = FieldType.Date, format = DateFormat.hour_minute)
  private String horaIni;

//  @Field(type = FieldType.Date, format = DateFormat.hour_minute)
  private String horaFin;

//  @Field(type = FieldType.Search_As_You_Type)
  private String modeloyMarcaVehiculo;

//  @MultiField(mainField = @Field(type = FieldType.Text, name = "marcaVehiculo"),
//  otherFields = @InnerField(suffix = "keyword", type = FieldType.Keyword))   // se utiliza para agregar un sufijo al nombre del campo secundario.Ej:  marcaVehiculo_keyword
  private String marcaVehiculo;

//  @MultiField(mainField = @Field(type = FieldType.Text, name = "modeloVehiculo"),
//  otherFields = @InnerField(suffix = "keyword", type = FieldType.Keyword))
  private String modeloVehiculo;

//  @Field(type = FieldType.Text)
  private String imagenURL;

  @Field(type = FieldType.Keyword)
  private String tipoVehiculo;

  @Field(type = FieldType.Keyword)
  private String alquilable;

  @Field(type = FieldType.Date)
  private Date lastUpdated;

  @Field(type = FieldType.Nested)
  private List<Map<String, Object>> caracteristicas;

  @Field(type = FieldType.Nested)
  private List<Map<String, Integer>> precio;

  @Field(type = FieldType.Nested)
  private List<Map<String, Boolean>> extras;
 
  
  //aja
  @Field(type = FieldType.Date, format = DateFormat.date, name= "dateIni")
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Jakarta")
  private LocalDate dateIni;
  
  //aja
  @Field(type = FieldType.Date, format = DateFormat.date, name= "dateFin")
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Jakarta")
  private LocalDate dateFin;

}
