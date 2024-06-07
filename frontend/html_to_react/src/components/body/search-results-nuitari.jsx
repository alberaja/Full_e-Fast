// src/components/SearchResults.js
import React from 'react';

//ok antes import './buscarVehiculo.css';
import { Link, Route } from 'react-router-dom';

// iconos
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

import Card from './Card'
import { transformdata } from './transformData'
import Paginador from './Paginador';
import { useLocation } from 'react-router-dom';

const SearchResultsCarsEFast = ({ params, results , numDiasRangoEntreFechas}) => {

    // ver que llega
    // console.log(results.Cars);
    let diasReservados = numDiasRangoEntreFechas;//= 5;
    //sessionStorage.getItem('diasReservados') ?? new Date();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Verifica si los parámetros tienen valor
    const isFechaHoraFinValid = queryParams.get('fechaHoraFin');
    const isFechaHoraIniValid = queryParams.get('fechaHoraIni');
    const isCiudadesVehiculo = queryParams.get('ciudadesVehiculo');

    // Si alguno de los parámetros no tiene valor, deshabilita el link    
    const isDisabled=(!isFechaHoraFinValid || !isFechaHoraIniValid || !isCiudadesVehiculo) ?true:false;
    return (        

        //  Cards
        // <!--Coche Tesla-->
        <main>
            
            <div className=" px-5 py-24 mx-auto  flex flex-col gap-4" >
           
                { queryParams.get('ciudadesVehiculo') ?  <p className='flex justify-center'>Ciudad de origen: { queryParams.get('ciudadesVehiculo')}</p> : ""}
                { queryParams.get('ciudadesDevolverVehiculo') ?  <p className='flex justify-center'>Ciudad destino: { queryParams.get('ciudadesDevolverVehiculo')}</p> : ""}
                <p className='flex justify-center'>Resultados para esas fechas: {results.totalHits} </p>                
                <Paginador results={results}></Paginador>
                    {results && results.vehiculos?.map((coche) => {
                        const props = transformdata(coche)
                        const urlVar = { pathname: '/vehiculoElegido/'+coche.id, state: { diasReservados /*, coche: coche.car_model, price: coche.price*/ } }
                        //const linkProps = {diasReservados}
                        return <Card {...props } isDisabled={isDisabled} url={urlVar} idCar={coche.id}/*diasReservados={diasReservados}*/ />
                    })
                    }                
                <Paginador results={results}></Paginador>
            </div>
           


            {/* <!--contenedor__caja de imagenes Coche-->  */}

        </main>

    );
};

export default SearchResultsCarsEFast;
