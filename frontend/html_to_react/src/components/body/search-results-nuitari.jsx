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
import { Pagination } from '@mui/material';

const SearchResultsCarsEFast = ({ results , numDiasRangoEntreFechas}) => {

    // ver que llega
    // console.log(results.Cars);
    let diasReservados = numDiasRangoEntreFechas;//= 5;
    //sessionStorage.getItem('diasReservados') ?? new Date(); 
    return (
        

        //  Cards
        // <!--Coche Tesla-->
        <main>
            <Pagination count={10} color="primary"></Pagination>

            <div className=" px-5 py-24 mx-auto  flex flex-col gap-4" >
                {results && results.vehiculos?.map((coche) => {
                    const props = transformdata(coche)
                    const urlVar = { pathname: '/vehiculoElegido/'+coche.id, state: { diasReservados /*, coche: coche.car_model, price: coche.price*/ } }
                    //const linkProps = {diasReservados}
                    return <Card {...props } url={urlVar} idCar={coche.id}/*diasReservados={diasReservados}*/ />
                })
                }
            </div>
           


            {/* <!--contenedor__caja de imagenes Coche-->  */}

        </main>

    );
};

export default SearchResultsCarsEFast;
