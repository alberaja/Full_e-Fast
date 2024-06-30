package com.elastic.efast.service;

import java.util.List;

import com.elastic.efast.entity.V3EfastEntity;
import com.elastic.efast.entity.V3EfastEntityLowercase;

public interface RandomCarEfastService {

//  List<String> BRANDS = List.of("Toyota", "Honda", "Ford", "Hyundai", "BMW");
//  List<String> COLORS = List.of("Red", "Black", "White", "Silver", "Blue");
//  List<String> TYPES = List.of("Sedan", "SUV", "MPV", "Hatchback", "Convertible");
//  List<String> ADDITIONAL_FEATURES = List.of("GPS", "Alarm", "Sunroof", "Media player", "Leather seats");
//  List<String> FUELS = List.of("Gas", "Electric", "Hybrid");
//  List<String> TIRE_MANUFACTURERS = List.of("Goodyear", "Bridgestone", "Dunlop");
  
  // aja
	// 50 ciudades
  List<String> SPANISH_CITIES = List.of("Ávila", "Albacete", "Alicante", "Almería", "Alcorcón", "Algeciras", "Badalona", "Badajoz", "Barcelona", "Bilbao", "Burgos", "Cáceres", "Cádiz", "Cartagena", "Castellón de la Plana", "Ciudad Real", "Córdoba", "Cuenca", "Donostia-San Sebastián", "Elche", "Gijón", "Girona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén", "Jerez de la Frontera", "Lleida", "León", "Logroño", "Lugo", "Madrid", "Málaga", "Marbella", "Mataró", "Murcia", "Ourense", "Oviedo", "Palencia", "Palma", "Pamplona", "Parla", "Pontevedra", "Reus", "Sabadell", "Sagunto", "Salamanca", "San Cristóbal de La Laguna", "Santander", "Santa Cruz de Tenerife", "Santa Coloma de Gramenet", "Santiago de Compostela", "Segovia", "Sevilla", "Soria", "Tarragona", "Terrassa", "Toledo", "Torrelavega", "Valencia", "Valladolid", "Vigo", "Vitoria-Gasteiz", "Zamora", "Zaragoza");
  List<String> CAR_BRANDS  = List.of("Tesla", "Nissan", "Chevrolet", "BMW", "Audi", "Ford", "Mercedes-Benz", "Hyundai", "Kia", "Volkswagen", "Volvo", "Toyota");
  //List<String> CAR_MODELS  = List.of("Model S", "Model 3", "Leaf", "Bolt EV", "i3", "e-tron", "Mustang Mach-E", "EQC", "Kona Electric", "Soul EV", "ID.4");
  List<String> MOTORCYCLE_BRANDS = List.of("Zero", "Harley-Davidson", "Energica", "Lightning", "BMW", "KTM", "Honda", "Yamaha", "Ducati", "Vespa" );
  //List<String> MOTORCYCLE_MODELS = List.of("SR/F", "LiveWire", "Ego", "Strike", "C Evolution", "Freeride E-XC", "PCX Electric", "EC-03", "Super Soco TC", "Elettrica" );
  List<String> FUELS = List.of("BEV","SHEV","PHEV","HEV","MHEV");  // "Gas", "Electric", "Hybrid"
  List<String> VEHICLES_TYPES = List.of("Coche","Moto");
  List<String> TRANSMISSION_TYPES = List.of("Automatico", "Manual");
  
  
  
  V3EfastEntityLowercase generateCar();

}

