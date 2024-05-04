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

const SearchResultsCarsEFast = ({ results }) => {

    // ver que llega
    // console.log(results.Cars);
    let diasReservados = 5;
    //sessionStorage.getItem('diasReservados') ?? new Date(); 
    return (
        // OK mostrar en Lista
        // <ul>
        //   {results.map((result) => (
        //     <li key={result.id}>{result.name} {result.username}</li>
        //   ))}
        // </ul>


        // datos en Tabla
        // <div className="table-responsive">
        //    <table className="table table-sm table-bordered">
        //      <thead>
        //        <tr>
        //          <th>ID</th>
        //          <th>Nombre</th>
        //          <th>Teléfono</th>
        //          <th>Nombre de Usuario</th>
        //          <th>Correo</th>
        //          <th>Sitio Web</th>
        //          <th>Ciudad</th>
        //          <th>Empresa</th>
        //        </tr>
        //      </thead>

        //      <tbody>
        //        {results && 
        //        results.map((usuario)=>(
        //          <tr key={usuario.id}>
        //            <td>{usuario.id}</td>
        //            <td>{usuario.name}</td>
        //            <td>{usuario.phone}</td>
        //            <td>{usuario.username}</td>
        //            <td>{usuario.email}</td>
        //            <td>{usuario.website}</td>
        //            <td>{usuario.address.city}</td>
        //            <td>{usuario.company.name}</td>
        //          </tr>
        //        ))}
        //      </tbody>

        //    </table>

        //  </div>


        //  Cards
        // <!--Coche Tesla-->
        <main>

            {/* {results && 
           results.map((usuario)=>(
             <tr key={usuario.id}>
               <td>{usuario.id}</td>
               <td>{usuario.name}</td>
               <td>{usuario.phone}</td>
               <td>{usuario.username}</td>
               <td>{usuario.email}</td>
               <td>{usuario.website}</td>
               <td>{usuario.address.city}</td>
               <td>{usuario.company.name}</td>
             </tr>
           ))} */}

            {/* para respuestas de 1 array de elementos, como https://jsonplaceholder.typicode.com/users: 
                    results.map((coche) => ( */}
            {/* <h6> JSON.stringify({results.Cars});  </h6> */}


            {/* OJO  acceder a Arraylist si esta vacio sin errores!!
            https://kinsta.com/knowledgebase/typeerror-cannot-read-property-map-of-undefined/  */}
            {/* {results.Cars?.map((item) => (
                console.log(item.car)
            ))}{ */}
                                {/* Cars */}
            {results && results.vehiculos?.map((coche) => (
                <section key={coche.id}     className="contenedor__caja__vehiculos__tesla" id="vehiculos">
                    <div className="contenedor__caja__vehiculos__dinamico__tesla">
                        <div className="caja__tesla">
                            <a href="" className="caja__tesla__imagen">
                                {/*<img src="/images/tesla3.png" className="imagenCoche" />*/}
                                <img src={coche.imagen_url} className="imagenCoche" />
                            </a>
                        </div>
                    </div>
                    <section className="producto__tesla">
                        <div className="producto__tesla__parrafo">    
                                                                        {/* {coche.car} {coche.car_model} */}                         {/* BEV                                 Moto */}
                            <h1 className="producto__tesla__parrafo">{coche.marcay_modelo_vehiculo}  </h1> <h5 style={{ color: 'gray' }}>{coche.caracteristicas[0].tipoVehiculo} {coche.tipo_vehiculo} </h5>
                        </div>
                        <section className="producto__tesla__caracteristicas">
                            <div className="producto__tesla__parrafo__caracteristicas">
                                <div className="producto__tesla__parrafo__plazos">
                                    {/* <p className="producto__tesla__parrafo__plazas-p"><img src="/images/icono-user.svg" /> 5 plazas</p> */}
                                    <PeopleAltOutlinedIcon /> <p className="producto__tesla__parrafo__plazas-p"> {coche.caracteristicas[0].numplazas} plazas</p> 
                                </div>
                                <div className="producto__tesla__parrafo__plazos">                                      {/* 649 litros   */}
                                    <p className="producto__tesla__parrafo__litros-p"> {/*<img src="/images/equipaje.svg" />*/} <LocalDrinkIcon />  {coche.caracteristicas[0].litros} litros</p>
                                </div>
                                <div className="producto__tesla__parrafo__plazos">                                       {/* 547km autonomía   */}
                                    <BatteryChargingFullRoundedIcon />  <p className="producto__tesla__parrafo__autonomia-p">{/*<img src="/images/bateria.svg" /> */} {coche.caracteristicas[0].autonomiaKm}km autonomía</p>
                                </div>
                                <div className="producto__tesla__parrafo__plazos">
                                    <p className="producto__tesla__parrafo__autonomia-p">
                                                                {/* Automatico/Manual . Mostrarla solo si {coche.tipo_vehiculo}=Coche*/}
                                    <SettingsOutlinedIcon /> {coche.caracteristicas[0].cajaCambio}                                    
                                    </p>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className="barra__tesla">
                        <div className="barra__tesla__precio">
                            <div className="barra__tesla__precio__dia">
                                <p className="precio__dia">Precio por 1 día</p>
                                <h3 className="precio__dia__tesla-especifico">   {/*159€*/} {coche.precio[0].por1DiaEuros}€   {/*coche.price*/}</h3>
                                {/* mostrar solo si {coche.precio[0].cancelacionGratis}=true */}
                                {coche.precio[0].cancelacionGratis ? (
                                <div>
                                    {/* Si cancelacionGratis es true, se muestra el icono y el texto */}
                                    {/* <img className="iconoCheck" src="/images/check.svg" /> */}
                                    <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                    <p className="barra__precio-Cancelacion__gratuita">Cancelación gratuita</p>
                                </div>
                                ) : null}
                            </div>
                        </div>
                        <a href="teslaElegido.html" className="barra__oferta__tesla">
                            {/* <div>Ver oferta</div> */}
                                        {/* price: coche.numPlazas   price: coche.capLitros   price: coche.numPlazas   price: coche.autonomiaKm   price: coche.precioDiaEur */}
                                        {/* price: coche.price  = = precioDiaEur */}    
                                        {/* {coche.id}               /{id}/ siendo id=coche.id      */}
                            <Link to={{ pathname: '/vehiculoElegido/'+coche.id, state: { diasReservados, coche: coche.car_model, price: coche.price } }}>Ver oferta</Link>
                            {/* search: "?id="+ "" */}
                        </a>
                    </section>
                </section>

            ))
            }


            {/* <!--contenedor__caja de imagenes Coche-->  */}

        </main>

    );
};

export default SearchResultsCarsEFast;
