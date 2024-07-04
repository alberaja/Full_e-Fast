import { create } from 'zustand'
{/* Zustand */}
export const useStoreVehiculo = create((set, get) => ({
    carData: { // todos
      // valores a mantener en estado Global y que necesito enviar luego al POST .../api/reservas  . postman: "! api/reservas Copy"
      vehiculoId: 0,
      fechaHoraIni: "",
      fechaHoraFin: "",
      ciudadesVehiculo: "",
      ciudadesDevolverVehiculo: "",
      numeroDiasReservados: 0,

      vehiculoMarcaModelo: "",
      comentarios: "",  //FORMULARIO
      precioPorDia: 0,
      totalReserva: 0,   
    },
    rentalData: {  // index , setearlo en /busquedaVehiculos  
      fechaHoraIni: "",
      fechaHoraFin: "",
      ciudadesVehiculo: "",
      ciudadesDevolverVehiculo: "",
      numeroDiasReservados: 0,  
      totalReserva: 0,  
    },   
    cardVehicleData: { // datos a mostrar en la Card2 de la ultima ruta: /finalizarReserva  (cargarlos desde /vehiculoElegido)    
      vehiculoId: 0,
      vehiculoMarcaModelo: "",      
      numPlazas: 0,
      litros: 0,      
      autonomiaKm: 0,
      cajaCambio: "",
      tipoVehiculo: "",
      precioPorDia: 0,      
      //totalReserva: 0,         
    },
  setIdVehiculo: (id) => set((state) => ({ carData: {...state, vehiculoId : id} })),
  //updateDataCar: (newData) => set((state) =>( {carData: {...state, ...newData} })), // Duplica nuevas filas por cada seteo
  updateDataCar: (newData) => set(() =>( {carData: { ...newData} })), // <--usar esta
  setCardVehicleData: (newData) => set(() =>( {cardVehicleData: { ...newData} })), // <--usar esta. antes updateCardVehicleData()
      setRentalData: (newData) => set(() =>( {rentalData: { ...newData} })),
      setTotalReservaRentalData: (data) => set(state => ({
        rentalData: { ...state.rentalData, ...data }
    })),
  // /vehiculoElegido
  setearValoresZustand_cardVehicleData(vehiculo, totalReserva){//vehiculo es el data que recibo del APi desde /vehiculoElegido
    console.log("okkkkkkkkkkkk vehiculo", vehiculo);
              
    if (vehiculo?.vehiculos && vehiculo.vehiculos.length > 0) {
        const vehicle = vehiculo.vehiculos[0];        
        //console.log("vehiculosssss", vehicle.marcay_modelo_vehiculo)
       
        // setCardVehicleData({ vehiculoId: vehiculo.id , vehiculoMarcaModelo: vehiculo.marcay_modelo_vehiculo});      
        // Setear todos campos necesarios a guardar en Zustan dentro de cardVehicleData{}
                            // campo-cardVehicleData:  campo-delAPI,
        // get PrecioPor1dia si tiene offerta

        //   const hasSpecialOffer = vehicle?.precio[0].ofertaEspecial === true;
        //   const precio = hasSpecialOffer ? vehicle?.precio[0].precioOferta : vehicle?.precio[0].por1DiaEuros;  
                     
        // const newVehicle = { vehiculoId: vehicle.id , 
        //                      vehiculoMarcaModelo: vehicle.marcay_modelo_vehiculo , 
        //                     //  numeroDiasReservados: 0,
        //                      numPlazas: vehicle.caracteristicas[0].numplazas,
        //                      litros: vehicle.caracteristicas[0].litros,
        //                      autonomiaKm: vehicle.caracteristicas[0].autonomiaKm,
        //                      cajaCambio: vehicle.caracteristicas[0].cajaCambio,
        //                      tipoVehiculo: vehicle.caracteristicas[0].tipoVehiculo,
        //                      precioPorDia: /*vehicle.precio[0].por1DiaEuros*/precio,
        //                      totalReserva: totalReserva ?? 0,   // precio calculado en /vehiculoElegido
        //                     }
        //     console.log("totalReserva: ", totalReserva)
        // get().setCardVehicleData( newVehicle )

        // setear en Zustand el vehiculo completo de la respuesta del API desde /finalizarReserva: const datosvehiculoElegido = useStoreVehiculo(state => state.cocheReserva)
        set({cocheReserva : vehicle})
    }
},
setearRentalData_rentalData(vehicleRentalData){
  const rentalDataVehicle = { fechaHoraIni: vehicleRentalData.fechaHoraIni , 
                      fechaHoraFin: vehicleRentalData.fechaHoraFin,
                      ciudadesVehiculo: vehicleRentalData.ciudadesVehiculo,
                      ciudadesDevolverVehiculo: vehicleRentalData.ciudadesDevolverVehiculo,
                      // numeroDiasReservados: vehicleRentalData.numeroDiasReservados, //"",
                      // totalReserva: vehicleRentalData.numeroDiasReservados, 
                      }
          console.log("Zustand: rentalDataVehicle", rentalDataVehicle)                   
  get().setRentalData( rentalDataVehicle )
},

setearRentalData_datosReserva(totalReservaValue, numdiasReservados){
  const rentalDataVehicle = {
                      totalReserva: totalReservaValue, 
                      numeroDiasReservados: numdiasReservados,
                      }                        
  get().setTotalReservaRentalData( rentalDataVehicle )
}
    

}))