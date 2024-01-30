// src/components/SearchResults.js
import React, { useEffect } from 'react';
import styles from './teslaElegido.module.css';
import { useLocation } from "react-router-dom";


//ok antes import './buscarVehiculo.css';
import { Link, Route } from 'react-router-dom';

const CocheElegido = ({ results }) => {

    // ver que llega
    // console.log(results.Cars);
    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    console.log(location.state);
    let numdiasReservados = location.state.diasReservados;
    let coche = location.state.coche;
    let precio = location.state.price;    // = precioDiaEur
    let precioAlquilerCalculado = precio * numdiasReservados;
    let numPlazas = location.state.numPlazas;
    let capLitros = location.state.capLitros;
    let autonomiaKm = location.state.autonomiaKm;
    // {console.log("valor actual: ", precio)}





    return (
        // /cocheElegido
        // <main>
        <>

            {/* <!--Elección--> */}
            {/* aja: traerse el Hash del module CSS */}
            {/* resultado: class="teslaElegido_contenedor__eleccion__DJXrw"
            nombreFicherodelModulo_nombreClase_hashdelCSS */}
            <section className={ styles["contenedor__eleccion"] } >
                <div className="contenedor__eleccion__tu">
                    <h3 className="contenedor__eleccion-parrafo">Tu elección</h3>
                </div>
            </section>
            {/* <!--Coche Tesla--> */}
            <section className="contenedor__caja__vehiculos__tesla" id="vehiculos">
                <div className="contenedor__caja__vehiculos__dinamico__tesla">
                    <div className="caja__tesla">
                        <a href="teslaCaracteristicas.html" className="caja__tesla__imagen">
                            <img src="images/tesla3.png" className="imagenCoche" />
                        </a>
                    </div>
                </div>
                <section className="producto__tesla">
                    <div className="producto__tesla__parrafo">
                        <h1 className="producto__tesla__parrafo">{coche}</h1>
                    </div>
                    <section className="producto__tesla__caracteristicas">
                        <div className="producto__tesla__parrafo__caracteristicas">
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__plazas-p"><img src="images/icono-user.svg" /> 5 plazas</p>
                            </div>
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__litros-p"><img src="images/equipaje.svg" /> 649 litros</p>
                            </div>
                            <div className="producto__tesla__parrafo__plazos">
                                <p className="producto__tesla__parrafo__autonomia-p"><img src="images/bateria.svg" /> 547km autonomía</p>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="barra__tesla">
                    <div className="barra__tesla__precio">
                        <div className="barra__tesla__precio__dia">
                            <p className="precio__dia">Precio por <span>1</span> día</p>
                            <h3 className="precio__dia__tesla-especifico"><span>{precio}</span>€</h3>
                            {/* <span>159</span>€</h3> */}
                            <img className="iconoCheck" src="images/check.svg" />
                            <p className="barra__precio-Cancelacion__gratuita">Cancelación gratuita</p>
                        </div>
                    </div>
                    <div className="barra__oferta__tesla">
                        <img className="imagen__llave" src="images/entrega__llave.png" />
                    </div>
                </section>
            </section>
            {/* <!--contenedor__caja de imagenes Coche--> */}
            {/* <!--luego de imagen Coche--> */}
            <section className={ styles["contenedor__inluido"] }>
                <div className={ styles["contenedor__inluido_precio"]}>
                    <h3 className={ styles["contenedor__inluido_precio-parrafo"] }>Incluye en el precio</h3>
                </div>
            </section>
            <section className={ styles["contenedor__inluido__cancelacion"] }>
                <ul className={ styles["contenedor__inluido__cancelacion__precio"] }>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Cancelación gratuita hasta 48 horas antes de la recogida</li>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Cobertura parcial por colisión con franquicia de 1450€</li>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Cobertura en caso de robo con franquicia de 1450€</li>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Kilometraje ilimitado</li>
                </ul>
            </section>
            <section className={ styles["contenedor__inluido__muy"] }>
                <div className={ styles["contenedor__inluido__muyBueno"] }>
                    <h3 className={ styles["contenedor__inluido__muyBueno-parrafo"] }>¡Muy buena elección!</h3>
                </div>
            </section>
            <section className={ styles["contenedor__inluido__muyBuena"] }>
                <ul className={ styles["contenedor__inluido__muyBuena__eleccion"] }>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo de alto confort</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo con altas prestaciones</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo en perfecto estado</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Cancelación gratuita</li>
                </ul>
            </section>
            <section className={ styles["contenedor__desglose"] }>
                <div className={ styles["contenedor__desglose__precioCoche"] }>
                    <h3 className={ styles["contenedor__desglose__precioCoche-parrafo"] }>Desglose del precio del coche</h3>
                </div>
            </section>
            <section className={ styles["contenedor__desglose__total"] }>
                <div className={ styles["contenedor__desglose__total__precio"] }>
                    <div className={ styles["contenedor__desglose__total__precio-parrafo"] }>Precio del alquiler</div>
                    <div className={ styles["contenedor__desglose__total__precio-parrafo"] }>{precioAlquilerCalculado}</div>
                </div>
            </section>

            <section className={ styles["contenedor__desglose__total__final"] }>
                <div className={ styles["contenedor__desglose__total__final__precio"] }>
                    <div className={ styles["contenedor__desglose__total__final__precio-parrafoDia"] }>Precio por <span>1</span> día:</div>
                    <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{precio}</span>€</div>
                    {/* <span>159</span>€</div> */}
                </div>
                <div className={ styles["contenedor__boton__reserva"] }>
                    <a className={ styles["contenedor__boton"] }>
                        {/* href="teslaReservar.html" */}
                        {/* <!--calendar link--> */}
                        {/* aplicarlo asi a todos los botones!! */}
                            {/* para el color del <a><a/> del button poner: color: white; */}
                        <div className={ styles["contenedor__boton-forma"] }>
                            <Link
                                to={
                                    {
                                        pathname: '/finalizarReserva',
                                        state: {
                                            numdiasReservados,
                                            coche,
                                            price: precio,
                                            precioAlquilerCalculado
                                        }
                                    }
                                }
                            >
                                Continuar con la reserva
                            </Link>
                        </div>
                    </a>
                </div>
            </section>

            {/* </main> */}
        </>
        // /cocheElegido
    );
};

export default CocheElegido;
