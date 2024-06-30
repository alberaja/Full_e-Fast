package com.elastic.efast.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;

import com.elastic.efast.entity.V3EfastEntityLowercase;
import com.elastic.efast.entity.subclass.Caracteristicas;
import com.elastic.efast.entity.subclass.Extras;
import com.elastic.efast.entity.subclass.GeoOficina;
import com.elastic.efast.entity.subclass.Precio;
import com.elastic.efast.entity.subclass.Seguro;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.CaracteristicasUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.ExtrasUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.PrecioUppercase;
import com.elastic.efast.entity.subclass.generateRandomSubClassesUppercase.SeguroUppercase;
import com.elastic.efast.service.RandomCarEfastService;

@Service
public class RandomCarEfastServiceImpl implements RandomCarEfastService {

	// ThreadLocalRandom.current().nextInt(BRANDS.size()) devuelve un número entero
	// pseudoaleatorio between 0 (inclusive) and the specified value (exclusive),
//  int numeroAleatorio = ThreadLocalRandom.current().nextInt(5, 8); // El límite superior (8) no está incluido
	// ThreadLocalRandom.current().nextBoolean() true o false con igual
	// probabilidad.
	// RandomDateUtil.generateRandomLocalDate() objeto LocalDate aleatorio.
	// ThreadLocalRandom.current().nextLong(min, max + 1); genera un Long entre los
	// limites min, max

	private static final Map<String, List<String>> CAR_BRAND_MODELS = new HashMap<>();
	private static final Map<String, List<String>> MOTORCYCLE_BRAND_MODELS = new HashMap<>();
	private static final Map<String, Double[]> SPANISH_CITY_COORDINATES = new HashMap<>();	

	// Los defino en la Interfaz aunq tb se podria aqui
//	private static final List<String> VEHICLE_TYPES = List.of("Coche", "Moto");
	
	static { // 12 marcas
		CAR_BRAND_MODELS.put("Tesla", Arrays.asList("Model S", "Model 3", "Model X", "Model Y"));
		CAR_BRAND_MODELS.put("Nissan", Arrays.asList("Leaf", "Ariya"));
		CAR_BRAND_MODELS.put("Chevrolet", Arrays.asList("Bolt EV", "Bolt EUV"));
		CAR_BRAND_MODELS.put("BMW", Arrays.asList("i3", "i4", "iX"));
		CAR_BRAND_MODELS.put("Audi", Arrays.asList("e-tron", "e-tron GT", "Q4 e-tron"));
		CAR_BRAND_MODELS.put("Ford", Arrays.asList("Mustang Mach-E"));
		CAR_BRAND_MODELS.put("Mercedes-Benz", Arrays.asList("EQC", "EQA", "EQB", "EQE", "EQS"));
		CAR_BRAND_MODELS.put("Hyundai", Arrays.asList("Kona Electric", "Ioniq 5", "Ioniq 6"));
		CAR_BRAND_MODELS.put("Kia", Arrays.asList("Soul EV", "Niro EV", "EV6"));
		CAR_BRAND_MODELS.put("Volkswagen", Arrays.asList("ID.4", "ID.3", "ID. Buzz"));
		CAR_BRAND_MODELS.put("Volvo", Arrays.asList("XC60", "XC90"));
		CAR_BRAND_MODELS.put("Toyota", Arrays.asList("Prius", "Prius Prime"));

		MOTORCYCLE_BRAND_MODELS.put("Zero", Arrays.asList("SR/F", "SR/S", "FX"));
		MOTORCYCLE_BRAND_MODELS.put("Harley-Davidson", Arrays.asList("LiveWire"));
		MOTORCYCLE_BRAND_MODELS.put("Energica", Arrays.asList("Ego", "Eva Ribelle", "EsseEsse9"));
		MOTORCYCLE_BRAND_MODELS.put("Lightning", Arrays.asList("Strike", "LS-218"));
		MOTORCYCLE_BRAND_MODELS.put("BMW", Arrays.asList("C Evolution", "CE 04"));
		MOTORCYCLE_BRAND_MODELS.put("KTM", Arrays.asList("Freeride E-XC", "E-Ride"));
		MOTORCYCLE_BRAND_MODELS.put("Honda", Arrays.asList("PCX Electric", "CR Electric"));
		MOTORCYCLE_BRAND_MODELS.put("Yamaha", Arrays.asList("EC-03", "E01"));
		MOTORCYCLE_BRAND_MODELS.put("Ducati", Arrays.asList("Super Soco TC"));
		MOTORCYCLE_BRAND_MODELS.put("Vespa", Arrays.asList("Elettrica"));

		
		SPANISH_CITY_COORDINATES.put("Madrid", new Double[] { 40.4168, -3.7038 });
		SPANISH_CITY_COORDINATES.put("Barcelona", new Double[] { 41.3851, 2.1734 });
		SPANISH_CITY_COORDINATES.put("Sevilla", new Double[] { 37.3886, -5.9823 });
		SPANISH_CITY_COORDINATES.put("Valencia", new Double[] { 39.4699, -0.3763 });
		SPANISH_CITY_COORDINATES.put("Alicante", new Double[] { 38.3452, -0.4810 });
		
		SPANISH_CITY_COORDINATES.put("Ávila", new Double[] { 40.6565, -4.6813 });
		SPANISH_CITY_COORDINATES.put("Albacete", new Double[] { 38.9943, -1.8564 });
		SPANISH_CITY_COORDINATES.put("Almería", new Double[] { 36.8340, -2.4637 });
		SPANISH_CITY_COORDINATES.put("Alcorcón", new Double[] { 40.3459, -3.8278 });
		SPANISH_CITY_COORDINATES.put("Algeciras", new Double[] { 36.1408, -5.4562 });
		SPANISH_CITY_COORDINATES.put("Badalona", new Double[] { 41.4500, 2.2474 });
		SPANISH_CITY_COORDINATES.put("Badajoz", new Double[] { 38.8794, -6.9706 });
		SPANISH_CITY_COORDINATES.put("Bilbao", new Double[] { 43.2630, -2.9350 });
		SPANISH_CITY_COORDINATES.put("Burgos", new Double[] { 42.3439, -3.6969 });
		SPANISH_CITY_COORDINATES.put("Cáceres", new Double[] { 39.4764, -6.3722 });
		SPANISH_CITY_COORDINATES.put("Cádiz", new Double[] { 36.5271, -6.2886 });
		SPANISH_CITY_COORDINATES.put("Cartagena", new Double[] { 37.6050, -0.9862 });
		SPANISH_CITY_COORDINATES.put("Castellón de la Plana", new Double[] { 39.9864, -0.0513 });
		SPANISH_CITY_COORDINATES.put("Ciudad Real", new Double[] { 38.9848, -3.9272 });
		SPANISH_CITY_COORDINATES.put("Córdoba", new Double[] { 37.8882, -4.7794 });
		SPANISH_CITY_COORDINATES.put("Cuenca", new Double[] { 40.0704, -2.1374 });
		SPANISH_CITY_COORDINATES.put("Donostia-San Sebastián", new Double[] { 43.3183, -1.9812 });
		SPANISH_CITY_COORDINATES.put("Elche", new Double[] { 38.2699, -0.7126 });
		SPANISH_CITY_COORDINATES.put("Gijón", new Double[] { 43.5322, -5.6611 });
		SPANISH_CITY_COORDINATES.put("Girona", new Double[] { 41.9794, 2.8214 });
		SPANISH_CITY_COORDINATES.put("Granada", new Double[] { 37.1773, -3.5986 });
		SPANISH_CITY_COORDINATES.put("Guadalajara", new Double[] { 40.6333, -3.1669 });
		SPANISH_CITY_COORDINATES.put("Huelva", new Double[] { 37.2614, -6.9447 });
		SPANISH_CITY_COORDINATES.put("Huesca", new Double[] { 42.1401, -0.4089 });
		SPANISH_CITY_COORDINATES.put("Jaén", new Double[] { 37.7796, -3.7849 });
		SPANISH_CITY_COORDINATES.put("Jerez de la Frontera", new Double[] { 36.6850, -6.1261 });
		SPANISH_CITY_COORDINATES.put("Lleida", new Double[] { 41.6176, 0.6200 });
		SPANISH_CITY_COORDINATES.put("León", new Double[] { 42.5987, -5.5671 });
		SPANISH_CITY_COORDINATES.put("Logroño", new Double[] { 42.4627, -2.4447 });
		SPANISH_CITY_COORDINATES.put("Lugo", new Double[] { 43.0125, -7.5583 });
		SPANISH_CITY_COORDINATES.put("Málaga", new Double[] { 36.7213, -4.4210 });
		SPANISH_CITY_COORDINATES.put("Marbella", new Double[] { 36.5101, -4.8824 });
		SPANISH_CITY_COORDINATES.put("Mataró", new Double[] { 41.5381, 2.4445 });
		SPANISH_CITY_COORDINATES.put("Murcia", new Double[] { 37.9922, -1.1307 });
		SPANISH_CITY_COORDINATES.put("Ourense", new Double[] { 42.3400, -7.8641 });
		SPANISH_CITY_COORDINATES.put("Oviedo", new Double[] { 43.3619, -5.8494 });
		SPANISH_CITY_COORDINATES.put("Palencia", new Double[] { 42.0095, -4.5288 });
		SPANISH_CITY_COORDINATES.put("Palma", new Double[] { 39.5696, 2.6502 });
		SPANISH_CITY_COORDINATES.put("Pamplona", new Double[] { 42.8125, -1.6458 });
		SPANISH_CITY_COORDINATES.put("Parla", new Double[] { 40.2370, -3.7670 });
		SPANISH_CITY_COORDINATES.put("Pontevedra", new Double[] { 42.4338, -8.6435 });
		SPANISH_CITY_COORDINATES.put("Reus", new Double[] { 41.1498, 1.1069 });
		SPANISH_CITY_COORDINATES.put("Sabadell", new Double[] { 41.5482, 2.1078 });
		SPANISH_CITY_COORDINATES.put("Sagunto", new Double[] { 39.6836, -0.2667 });
		SPANISH_CITY_COORDINATES.put("Salamanca", new Double[] { 40.9701, -5.6635 });
		SPANISH_CITY_COORDINATES.put("San Cristóbal de La Laguna", new Double[] { 28.4853, -16.3201 });
		SPANISH_CITY_COORDINATES.put("Santander", new Double[] { 43.4623, -3.8099 });
		SPANISH_CITY_COORDINATES.put("Santa Cruz de Tenerife", new Double[] { 28.4636, -16.2518 });
		SPANISH_CITY_COORDINATES.put("Santa Coloma de Gramenet", new Double[] { 41.4515, 2.2081 });
		SPANISH_CITY_COORDINATES.put("Santiago de Compostela", new Double[] { 42.8805, -8.5457 });
		SPANISH_CITY_COORDINATES.put("Segovia", new Double[] { 40.9429, -4.1088 });
		SPANISH_CITY_COORDINATES.put("Soria", new Double[] { 41.7667, -2.4796 });
		SPANISH_CITY_COORDINATES.put("Tarragona", new Double[] { 41.1189, 1.2445 });
		SPANISH_CITY_COORDINATES.put("Terrassa", new Double[] { 41.5632, 2.0089 });
		SPANISH_CITY_COORDINATES.put("Toledo", new Double[] { 39.8628, -4.0273 });
		SPANISH_CITY_COORDINATES.put("Torrelavega", new Double[] { 43.3495, -4.0479 });
		SPANISH_CITY_COORDINATES.put("Valladolid", new Double[] { 41.6520, -4.7286 });
		SPANISH_CITY_COORDINATES.put("Vigo", new Double[] { 42.2406, -8.7207 });
		SPANISH_CITY_COORDINATES.put("Vitoria-Gasteiz", new Double[] { 42.8467, -2.6717 });
		SPANISH_CITY_COORDINATES.put("Zamora", new Double[] { 41.5033, -5.7468 });
		SPANISH_CITY_COORDINATES.put("Zaragoza", new Double[] { 41.6488, -0.8891 });		
	}

	private static <T> T getRandomElement(T[] array) {
		int index = ThreadLocalRandom.current().nextInt(array.length);
		return array[index];
	}

	private static <T> T getRandomElement(List<T> list) {
		int index = ThreadLocalRandom.current().nextInt(list.size());
		return list.get(index);
	}
	
	private String getRandomElement(List<String> spanishCities, Random random) {
        int index = ThreadLocalRandom.current().nextInt(spanishCities.size());
        return spanishCities.get(index);
    }
//    private String getRandomElement(List<String> list) {
//        int index = ThreadLocalRandom.current().nextInt(list.size());
//        return list.get(index);
//    }	
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm");
	Calendar calendar = Calendar.getInstance();

	@Override
	public V3EfastEntityLowercase generateCar() {
//		String carBrand = getRandomElement(CAR_BRAND_MODELS.keySet().toArray(new String[0]));
//		String carModel = getRandomElement(CAR_BRAND_MODELS.get(carBrand));
		

		var car = new V3EfastEntityLowercase();
		car.setCiudadesVehiculo(getRandomCities(2));
		car.setCiudadesDevolverVehiculos(getRandomCities(3));
		car.setLocsVehiculo(getRandomLocs(ThreadLocalRandom.current().nextInt(1, 4))); // usado en mapa de Kibana  . 2 localizaciones solo getRandomLocs(2)
		Map<String, Double> randomLoc = getRandomLoc();
	    GeoOficina.Coordinates coordinates = new GeoOficina.Coordinates(randomLoc.get("lat"), randomLoc.get("lon"));
	    car.setGeoOficina(new GeoOficina(coordinates));
		car.setLastUpdated(getLastUpdate());
		car.setFechaIni(getRandomDateFechaIni(5));//2  //sysdate+2meses  //(getRandomDate(2));
		car.setFechaFin(getRandomDateFechaFin(6));//3  //sysdate+3meses  //(getRandomDate(3));
//		car.setHoraIni("07:00");
//		car.setHoraFin("20:00");
		car.setAlquilable("S");		

		String vehicleType = getRandomElement(VEHICLES_TYPES); 
		car.setTipoVehiculo(vehicleType);		

		String carBrandRandom = "";
		String motorcycleBrand = "";
		if (vehicleType.equalsIgnoreCase("Coche")) {
			carBrandRandom = getRandomElement(CAR_BRANDS);
			car.setMarcaVehiculo(carBrandRandom);
			car.setModeloVehiculo(getRandomElement(CAR_BRAND_MODELS.get(carBrandRandom)));
		} else {
			motorcycleBrand = getRandomElement(MOTORCYCLE_BRANDS);
			car.setMarcaVehiculo(motorcycleBrand);
			car.setModeloVehiculo(getRandomElement(MOTORCYCLE_BRAND_MODELS.get(motorcycleBrand)));
		}
		
		if (vehicleType.equalsIgnoreCase("Coche")) {
			car.setImagenURL(getImgforCar(carBrandRandom));
		} else {
			car.setImagenURL(getImgforMoto(motorcycleBrand));
		}
		
//		List<Caracteristicas> caracts = new ArrayList();
//		Caracteristicas carac = new Caracteristicas();
//		carac.setTipoVehiculo(fuel);
//		caracts.add(carac);
		car.setCaracteristicas(getRandomCaracteristicas(vehicleType));
		car.setPrecio(getRandomPrecio());
		car.setExtras(getRandomExtra());
		car.setSeguro(getRandomSeguro());

		return car;
	}

//	private /* ArrayList<String> */List<String> getRandomCities(int count) {
//		ArrayList<String> cities = new ArrayList<>();
//		for (int i = 0; i < count; i++) {
//			cities.add(getRandomElement(SPANISH_CITIES));
//		}
//		return cities;
//	}
	private String getRandomCities(int count) {
	    StringBuilder citiesBuilder = new StringBuilder();
	    Random random = new Random();

	    for (int i = 0; i < count; i++) {
	        if (i > 0) {
	            citiesBuilder.append(",");
	        }
	        citiesBuilder.append(getRandomElement(SPANISH_CITIES, random));
	    }

	    return citiesBuilder.toString();
	}
	
	
//	private List<Map<String, Double>> getRandomLocs(int count) {
//		List<Map<String, Double>> locs = new ArrayList<>();
//		for (int i = 0; i < count; i++) {
//			locs.add(getRandomLoc());
//		}
//		return locs;
//	}
	private List<V3EfastEntityLowercase.Coordinates> getRandomLocs(int count) {
	    List<V3EfastEntityLowercase.Coordinates> locs = new ArrayList<>();
	    for (int i = 0; i < count; i++) {
	    	 Map<String, Double> randomLoc = getRandomLoc();
	    	 locs.add(new V3EfastEntityLowercase.Coordinates(randomLoc.get("lat"), randomLoc.get("lon")));
	    }
	    return locs;
	}

//	private Map<String, Double> getRandomLoc() {
//		Map<String, Double> loc = new HashMap<>();
//		loc.put("lat", ThreadLocalRandom.current().nextDouble(-90, 90));
//		loc.put("lon", ThreadLocalRandom.current().nextDouble(-180, 180));
//		return loc;
//	}

//	private static Map<String, Double> getRandomLoc() {
//		int randomIndex = ThreadLocalRandom.current().nextInt(SPANISH_CITY_COORDINATES.size());
//		String[] cities = SPANISH_CITY_COORDINATES.keySet().toArray(new String[0]);
//		String randomCity = cities[randomIndex];
//		Double[] coordinates = SPANISH_CITY_COORDINATES.get(randomCity);
//
//		Map<String, Double> loc = new HashMap<>();
//		loc.put("lat", coordinates[0]); // latitude
//		loc.put("lon", coordinates[1]); // longitude
//		return loc;
//	}
	private static Map<String, Double> getRandomLoc() {
	    int randomIndex = ThreadLocalRandom.current().nextInt(SPANISH_CITY_COORDINATES.size());
	    String[] cities = SPANISH_CITY_COORDINATES.keySet().toArray(new String[0]);
	    String randomCity = cities[randomIndex];
	    Double[] coordinates = SPANISH_CITY_COORDINATES.get(randomCity);

	    Map<String, Double> loc = new HashMap<>();
	    loc.put("lat", coordinates[0]); // latitude
	    loc.put("lon", coordinates[1]); // longitude
	    return loc;
	}

//	private String getRandomDate(int monthsAhead) {
//		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm");
//		Calendar calendar = Calendar.getInstance();		
//		car.setLastUpdated(sdf.format(calendar.getTime()));
//		calendar.add(Calendar.MONTH, monthsAhead);
//		
//        return sdf.format(calendar.getTime());
//	}	
	private String getRandomDateFechaIni(int monthsAhead) {
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm");
			Calendar calendar = Calendar.getInstance();
		
	        // Añadir los meses
	        calendar.add(Calendar.MONTH, monthsAhead);
	        
	        // Establecer hora de inicio a 07:00
	        calendar.set(Calendar.HOUR_OF_DAY, 7);
	        calendar.set(Calendar.MINUTE, 0);
	        calendar.set(Calendar.SECOND, 0);
	        calendar.set(Calendar.MILLISECOND, 0);
	        
	        return sdf.format(calendar.getTime());	       
	}
	private String getRandomDateFechaFin(int monthsAhead) {
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm");
			Calendar calendar = Calendar.getInstance();
			
	        // Añadir los meses
	        calendar.add(Calendar.MONTH, monthsAhead);

	        // Establecer hora de fin a 20:00
	        calendar.set(Calendar.HOUR_OF_DAY, 20);
	        calendar.set(Calendar.MINUTE, 0);
	        calendar.set(Calendar.SECOND, 0);
	        calendar.set(Calendar.MILLISECOND, 0);
	        
	        return sdf.format(calendar.getTime());       
	}
	private String getLastUpdate() {	
		return (sdf.format(calendar.getTime()));
	}
	

//	private String getRandomImageUrl(String vehicleType) {
//		return vehicleType.equals("Coche")
//				? "https://www.tesla.com/ownersmanual/images/GUID-B5E41257-9BE5-4048-9667-4DA5FDF6D2E7-online-en-US.png"
//				: "https://motorcycle.url/sample_image.png";
//	}
	private String getImgforCar(String carBrandRandom) {
		String imgBrand = "";
		switch (carBrandRandom) {
		case "Tesla":
			imgBrand = "Default_Tesla_Model_S_0.webp";
			break;
		case "Nissan":
			imgBrand = "Default_Nissan_Leaf_0.webp";
			break;
		case "Chevrolet":
			imgBrand = "Default_Chevrolet_Bolt_EV_0.webp";
			break;
		case "BMW":
			imgBrand = "Default_BMW_3_Series_Mild_Hybrid_0.webp";
			break;
		case "Audi":
			imgBrand = "Default_Audi_A6_Mild_Hybrid_0.webp";
			break;
		case "Ford":
			imgBrand = "Default_Ford_Fusion_Hybrid_0.webp";
			break;
		case "Mercedes-Benz":
			imgBrand = "Default_MercedesBenz_EClass_Mild_Hybrid_0.webp";
			break;
		case "Hyundai":
			imgBrand = "Default_Hyundai_Ioniq_Hybrid_0.webp";
			break;
		case "Kia":
			imgBrand = "Default_Kia_Niro_Hybrid_0.webp";
			break;
		case "Volkswagen":
			imgBrand = "Default_Volkswagen_ID4_0.webp";
			break;
		case "Volvo":
			imgBrand = "Default_Volvo_XC90_T8_Twin_Engine_0.webp";
			break;
		case "Toyota":
			imgBrand = "Default_Toyota_Prius_Prime_0.webp";
			break;
		default:
			imgBrand = "Default_BMW_i3_0.webp"; // si la marca no está en el switch
			break;
		}
		return imgBrand;
	}
	
	private String getImgforMoto(String motoBrandRandom) {
		String imgBrand = "";
		switch (motoBrandRandom) {
		case "Zero":
			imgBrand = "Default_Zero_SRF_0.webp";
			break;
		case "Harley-Davidson":
			imgBrand = "Default_HarleyDavidson_LiveWire_0.webp";
			break;
		case "Energica":
			imgBrand = "Default_Energica_Ego_0.webp";
			break;
		case "Lightning":
			imgBrand = "Default_Lightning_Strike_0.webp";
			break;
		case "BMW":
			imgBrand = "Default_BMW_C_Evolution_0.webp";
			break;
		case "KTM":
			imgBrand = "Default_KTM_Freeride_EXC_0.webp";
			break;
		case "Honda":
			imgBrand = "Default_Honda_PCX_Electric_0.webp";
			break;
		case "Yamaha":
			imgBrand = "Default_Yamaha_EC03_0.webp";
			break;
		case "Ducati":
			imgBrand = "Default_Ducati_Super_Soco_TC_0.webp";
			break;
		case "Vespa":
			imgBrand = "Default_Vespa_Elettrica_0.webp";
			break;
		default:
			imgBrand = "motorbike.webp"; // si la marca no está en el switch
			break;
		}
		return imgBrand;

	}	
	

	private List<CaracteristicasUppercase> getRandomCaracteristicas(String vehicleType) {
		List<CaracteristicasUppercase> caracts = new ArrayList();
		CaracteristicasUppercase caracteristicas = new CaracteristicasUppercase();
		String fuel = FUELS.get(ThreadLocalRandom.current().nextInt(FUELS.size()));
		long min = 80L;//Kms Limitado hasta 100, Ilimitado desde 101 en adelante!!! //8_000_000_000L; //8888888L;//300L;  limitados hasta 9.999.999L
		long max = 120L;//12_000_000_000L; //15000000L;//ok 13333333333L;  // ilimitados >=10.000.000.000L;
		caracteristicas.setLitros(ThreadLocalRandom.current().nextInt(500, 1000));
		caracteristicas.setAutonomiaKm(ThreadLocalRandom.current().nextInt(160, 651));		
		caracteristicas.setTipoVehiculo(fuel);
		if (fuel.equalsIgnoreCase("SHEV") || fuel.equalsIgnoreCase("MHEV")) {
			caracteristicas.setEtiquetaECO(true);
		} else {
			caracteristicas.setEtiquetaECO(false);
		}

		if (!vehicleType.equalsIgnoreCase("Moto")) {
			caracteristicas.setNumeroBolsasmaletero(ThreadLocalRandom.current().nextInt(5, 9));
			caracteristicas.setNumPlazas(ThreadLocalRandom.current().nextInt(4, 8));// Aleatorio entre 4-7. 8 no incluido
		} else {
			caracteristicas.setNumeroBolsasmaletero(ThreadLocalRandom.current().nextInt(1, 3));//0
			caracteristicas.setNumPlazas(ThreadLocalRandom.current().nextInt(1, 3));
		}
		
		caracteristicas.setDescripcion("Vehiculo muy cómodo, rápido y veloz");
		caracteristicas.setCajaCambio(getRandomElement(TRANSMISSION_TYPES));
		caracteristicas.setAño(ThreadLocalRandom.current().nextInt(2022, 2025));// 2022-23-24
		caracteristicas.setMaximodeKm(ThreadLocalRandom.current().nextLong(min, max + 1)); // entre 300 y 1002L. El
																							// límite superior es
																							// exclusivo, agregamos 1
																							// para incluirlo.
		caracteristicas.setAltoConfort(true);
		caracteristicas.setAltasPrestaciones(ThreadLocalRandom.current().nextBoolean());
		caracteristicas.setPerfectoEstado(ThreadLocalRandom.current().nextBoolean());
//		TODO caracteristicas.set...

		caracts.add(caracteristicas);
		return caracts;
	}

	public /*static*/ List<PrecioUppercase> getRandomPrecio(/*int count*/) {
        Random rand = new Random();
        List<PrecioUppercase> precios = new ArrayList<>();
//        for (int i = 0; i < count; i++) {
            int porDiaEuros = 55 + rand.nextInt(201);  // Random between 55 and 255 both included
            boolean cancelacionGratis = rand.nextBoolean(); // random true/false
            boolean ofertaEspecial = rand.nextBoolean();
            int precioOferta = 35 + rand.nextInt(20);  // Random between 35 and 54

            precios.add(new PrecioUppercase(porDiaEuros, cancelacionGratis, ofertaEspecial, precioOferta));
//        }
        return precios;
    }

    public static List<ExtrasUppercase> getRandomExtra() {
        Random rand = new Random();
        List<ExtrasUppercase> extrasList = new ArrayList<>();
            boolean gps = rand.nextBoolean();
            boolean sillaBebe = rand.nextBoolean();
            boolean proteccionCarretera = rand.nextBoolean();
            int exencionDeFranquicia = 50 + rand.nextInt(151);  // Random between 50 and 200
            boolean opcionSeguroTodoRiesgo = rand.nextBoolean();

            extrasList.add(new ExtrasUppercase(gps, sillaBebe, proteccionCarretera, exencionDeFranquicia, opcionSeguroTodoRiesgo));
        return extrasList;
    }

    public static List<SeguroUppercase> getRandomSeguro() {
        Random rand = new Random();
        List<SeguroUppercase> seguros = new ArrayList<>();
            boolean coberturaParcialColisionFranquicia = rand.nextBoolean();
            int coberturaParcialColisionFranquiciaQty = 1000; 
            boolean coberturaRobo = rand.nextBoolean();
            int coberturaRoboColisionFranquiciaQty = 1000;

            seguros.add(new SeguroUppercase(coberturaParcialColisionFranquiciaQty, coberturaParcialColisionFranquicia, coberturaRobo, coberturaRoboColisionFranquiciaQty));
        return seguros;
    }

}
