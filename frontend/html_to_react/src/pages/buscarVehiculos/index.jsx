import styles from './buscarVehiculo.css';


import CarsResultados from './cars-resultados.jsx';
  //r-router-dom v5 import { useLocation , useHistory } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom"

import * as React from 'react';

import { useState, useEffect } from 'react';

import  DrawerMUI  from './drawer-mui.jsx';

import axios from 'axios';
import moment from 'moment';
import { paramsToObject } from '../../components/filters/menufiltros-checkbox-dinamicos.jsx';
import { useStoreVehiculo } from '../../zustand/store.js';
import VehiculosNoEncontrados from '../../components/body/VehiculosNoEncontrados.jsx';


export default function BuscarVehiculo() {

    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    // console.log( location.state);
    let numdiasReservados = (location.state?.diasReservados ?? 0); // location.state.diasReservados ?? 0; //si puede dar nuto la primera variable, la inicializa con valor = 0 
    let date1 = (location.state?.date1FormatoSeleccionada ?? 0); //location.state.date1FormatoSeleccionada;
    let date2 = (location.state?.date2FormatoSeleccionada ?? 0); //location.state.date2FormatoSeleccionada;

    const [open, setOpen] = React.useState(false);
    const drawerWidth = 240;

    // KAN-2
    const location2 = useLocation();
      //r-router-dom v5 const history = useHistory();
      let navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
       // Estado inicial con todos los valores de los parámetros de búsqueda
  const [params, setParams] = useState(location.search);
    // KAN-2
    // Función para actualizar los parámetros de búsqueda
    const updateSearchParams = (newParams) => {
      newParams = location.search;
        //r-router-dom v5 history.push({ search: newParams });
        navigate({ search: newParams })  
      //console.log("updateSearchParams----->>> ", newParams);
      setParams(newParams);
      //alert({newParams});
    };
    // KAN-2
      // Efecto para sincronizar los valores de búsqueda con el estado
      useEffect(() => {
        setParams(location.search);
        //alert(params.toString());
      }, [location.search]);


    // Zustand
    const {setearRentalData_rentalData} = useStoreVehiculo()

    // cargar contenido del Drawer dinamicamente:   <CarsResultados>(responde 'results') que debe usar este padre, y este padre enviarlo al hijo <DrawerMUI>
     const [results, setResults] = useState([]);
    useEffect(() => {     
      searchEfastApi(params );  
      
     
      const queryParams = paramsToObject(params)
      console.log("queryParams: ", queryParams  )
      setearRentalData_rentalData(queryParams)
    }, [params]);

    const searchEfastApi = async (query) => {
      try {       
         const response = await axios.get(` http://localhost:8762/elastic-efast/api/efast/v1/vehiculos${query}`); // vehicles
        //const response = await axios.get(` http://localhost:8080/agg-aja${query}`);

        setResults(response.data);       
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };
  
    //console.log(queryParams);
    const numDiasRangoEntreFechas = calcularRangoEntreFechas(queryParams );    
    console.log("nº dias calculados de alquiler -->", numDiasRangoEntreFechas);

    return (      
      <>
        <section className="contenedor__map">
          {/* <!--Ubicación Google Maps--> */}
          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.1495181159057!2d2.128709215289849!3d41.39255917926372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4986f48e9b1a3%3A0xcdad0dc13e079034!2sAv.%20de%20Sarri%C3%A0%2C%20150%2C%2008017%20Barcelona!5e0!3m2!1ses!2ses!4v1663318152366!5m2!1ses!2ses"
              width="600"
              height="450"
              style={{ border: "0;" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="ubicacion__vehiculos">
            <h3 className="ubicacion__vehiculos__parrafo">
              Av. de Sarrià, 150: Vehículos disponibles
            </h3>

            {/* de aja */}
            {/* se renderizará solo si las tres variables no son nulas o vacías */}
            {numdiasReservados && date1 && date2 ? (
              // {location.state.diasReservados}   {location.state.date1FormatoSeleccionada}    {location.state.date2FormatoSeleccionada}
              <h3>
                {" "}
                Seleccionaste {numdiasReservados} dias entre los días {date1} y{" "}
                {date2}
              </h3>
            ) : null}
          </div>
        </section>
        
      {results?.vehiculos?.length !== 0 ? (  
        <>
            <DrawerMUI params={params} updateSearchParams={updateSearchParams} results={results}></DrawerMUI>
        {/* Hacer prop drilling   https://www.aluracursos.com/blog/que-es-prop-drilling : enviar datos de cambios de Filtros->index(esta)->Buscador1(añada los queryparams a la URL de la card de buscar vehiculos)*/}

        {/* {console.log({params})  } */}
        {/* Listado de coches dinamico contra la API . Antiguo <Buscador1> */}               
            <CarsResultados params={params} resultados={results} numDiasRangoEntreFechas={numDiasRangoEntreFechas} /*callback={callback}*/ ></CarsResultados>
        </>
        ) : ("")}

       {results?.vehiculos?.length === 0 ? (
          <VehiculosNoEncontrados/>
        ) : ("")}
        
      </>
    );
}

function calcularRangoEntreFechas(queryParams){
    if (!queryParams.get('fechaHoraIni') || !queryParams.get('fechaHoraFin') ) return ''
    const fechaHoraIni = queryParams.get('fechaHoraIni').split('T')[0];
    const fechaHoraFin = queryParams.get('fechaHoraFin').split('T')[0];  
    console.log(fechaHoraIni, fechaHoraFin)
    moment.locale('es'); 
    const date1 = moment(fechaHoraIni, 'DD-MM-YYYY');
    const date2 = moment(fechaHoraFin, 'DD-MM-YYYY');
    console.log(date1.toDate(), date2.toDate())
    return date2.diff(date1, 'days');
}

