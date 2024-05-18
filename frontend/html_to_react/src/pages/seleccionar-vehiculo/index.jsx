// src/components/SearchResults.js
import React, { useEffect , useState} from 'react';
import styles from './teslaElegido.module.css';
//r-router-dom v5 import { useLocation , useHistory } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom"

import { useParams } from 'react-router-dom';

//ok antes import './buscarVehiculo.css';
import { Link, Route } from 'react-router-dom';


// iconos
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

//import imagen from 'images/Zero-SRF-360-9.png'; // Ruta relativa   ../../../public/images/entrega__llave.png

const CocheElegido = ({ /*results*/ }) => {
    // EL id lo recibo de la URL
    const { id } = useParams();
    const [results, setResults] = useState(null);

    // ver que llega
    // console.log(results.Cars);
    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    // console.log("location.state:", location.state);
    let numdiasReservados = location?.state?.diasReservados ?? 0;   //si es undefined, devolver 0
    let coche = location?.state?.coche;
    let precio = 30; //= location.state.price;    // = precioDiaEur   // precio ={results?.vehiculos[0]?.precio[0].por1DiaEuros}
    //let precioAlquilerCalculado = precio * numdiasReservados;
    let numPlazas = location?.state?.numPlazas;
    let capLitros = location?.state?.capLitros;
    let autonomiaKm = location?.state?.autonomiaKm;
    // {console.log("valor actual: ", precio)}



    const location2 = useLocation();
      //r-router-dom v5 const history = useHistory();
      let navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
       // Estado inicial con todos los valores de los parámetros de búsqueda
  const [params, setParams] = useState(location.search);
    // Función para actualizar los parámetros de búsqueda
    const updateSearchParams = (newParams) => {
      newParams = location.search;
        //r-router-dom v5 history.push({ search: newParams });
        navigate({ search: newParams })
      setParams(newParams);
      alert({newParams});
    };
//       // Efecto para sincronizar los valores de búsqueda con el estado
    //   useEffect(() => {
    //     setParams(location.search);
    //     alert({params});
    //   }, [location.search]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:8762/elastic-efast/api/efast/v1/vehiculos?idVehiculo=${id}`);
              //console.log(response.status)
              if(response.status !== 200 ){ navigate("/") /* r-router-dom v5 history.push("/") */}
              const data = await response.json();
            //   console.log(data);
            setResults(data);
              // Aquí puedes manejar la respuesta de la llamada GET
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          };
      
          fetchData();
    }, [id]);

    let precioAlquilerCalculado = results?.vehiculos[0]?.precio[0].por1DiaEuros ? results?.vehiculos[0]?.precio[0].por1DiaEuros * numdiasReservados : null;
    console.log("precioAlquilerCalculado=", results?.vehiculos[0]?.precio[0].por1DiaEuros, '*',numdiasReservados, precioAlquilerCalculado)
    return (
        // /cocheElegido
        // <main>
        
        <>
        {/* <div><img src="/images/Zero-SRF-360-9.png" className="imagenCoche" /> </div> */}
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
            {/* <section className="contenedor__caja__vehiculos__tesla" id="vehiculos">
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
                            {/* <span>159</span>€</h3> 
                            <img className="iconoCheck" src="images/check.svg" />
                            <p className="barra__precio-Cancelacion__gratuita">Cancelación gratuita</p>
                        </div>
                    </div>
                    <div className="barra__oferta__tesla">
                        <img className="imagen__llave" src="images/entrega__llave.png" />
                    </div>
                </section>
            </section> */}
            {/* {precio =results?.vehiculos[0]?.precio[0].por1DiaEuros} */}
            {/* TODO:  componetizar mas el de cards de search-results-carsEFast.jsx */}
                        {/* {console.log({results})} */}
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
                        <div className="barra__oferta__tesla">
                            {/* <img className="imagen__llave" /*src="images/entrega__llave.png"*/ /*src={imagen} src="images/Zero-SRF-360-9.png" /> */}
                            <img className="imagen__llave" src="/images/entrega__llave.png" />                          
                        </div>
                    </section>
                </section>

            ))
            }
            
            {/* <!--contenedor__caja de imagenes Coche--> */}
            {/* <!--luego de imagen Coche--> */}
            <section className={ styles["contenedor__inluido"] }>
                <div className={ styles["contenedor__inluido_precio"]}>
                    <h3 className={ styles["contenedor__inluido_precio-parrafo"] }>Incluye en el precio</h3>
                </div>
            </section>
            <section className={ styles["contenedor__inluido__cancelacion"] }>
                <ul className={ styles["contenedor__inluido__cancelacion__precio"] }>                    
                {/* {JSON.stringify(results.vehiculos[0]?.precio[0]?.cancelacionGratis)} */}
                                {/* {results?.vehiculos[0]?.precio[0]?.cancelacionGratis ? (
                                    <div>
                                        {/* Si cancelacionGratis es true, se muestra el icono y el texto */}
                                        {/* <img className="iconoCheck" src="/images/check.svg" /> 
                                        <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                        {/* <p className="barra__precio-Cancelacion__gratuita">Cancelación gratuita</p> 
                                    </div>
                                ) : null} */}
                    {/* <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Cancelación gratuita hasta 48 horas antes de la recogida</li> */}
                    <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                        {results?.vehiculos[0]?.precio[0]?.cancelacionGratis ? (
                            <div>
                                {/* Si cancelacionGratis es true, se muestra el icono y el texto */}
                                {/* <img className={styles["iconoCheck1"]} src="/images/check.svg" /> */}
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                &nbsp; Cancelación gratuita hasta 48 horas antes de la recogida
                            </div>
                        ) : null}
                    </li>
                    {/* <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Cobertura parcial por colisión con franquicia de 1450€</li>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Cobertura en caso de robo con franquicia de 1450€</li>
                    <li className={ styles["contenedor__inluido__cancelacion__precio-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg"/>Kilometraje ilimitado</li> */}
                    <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                        {results?.vehiculos[0]?.seguro[0]?.coberturaParcialcolisionFranquicia ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                 {/* 1450€ */}
                                 &nbsp; Cobertura parcial por colisión con franquicia de {results?.vehiculos[0]?.seguro[0]?.coberturaParcialcolisionFranquiciaQty}€
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                        {results?.vehiculos[0]?.seguro[0]?.coberturaRobo ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                                                                    {/* 1450€ */}
                                &nbsp; Cobertura en caso de robo con franquicia de {results?.vehiculos[0]?.seguro[0]?.coberturaRobocolisionFranquiciaQty}€
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                        {/* 10000000000	"=Ilimitado , sino es Limitado*/}
                        {results?.vehiculos[0]?.caracteristicas[0]?.maximodeKm === 10000000000 ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                &nbsp; Kilometraje ilimitado
                            </div>
                        ) :  (                  /* Kilometraje Limitado*/
                                <div>  <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                &nbsp; Kilometraje hasta {results?.vehiculos[0]?.caracteristicas[0]?.maximodeKm} kms </div>
                        )
                        }
                    </li>
                </ul>
            </section>
            <section className={ styles["contenedor__inluido__muy"] }>
                <div className={ styles["contenedor__inluido__muyBueno"] }>
                    <h3 className={ styles["contenedor__inluido__muyBueno-parrafo"] }>¡Muy buena elección!</h3>
                </div>
            </section>
            <section className={ styles["contenedor__inluido__muyBuena"] }>
                <ul className={ styles["contenedor__inluido__muyBuena__eleccion"] }>
                    {/* <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo de alto confort</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo con altas prestaciones</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Vehículo en perfecto estado</li>
                    <li className={ styles["contenedor__inluido__muyBuena__eleccion-parrafo"] }><img className={ styles["iconoCheck1"] } src="images/check.svg" />Cancelación gratuita</li> */}
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {results?.vehiculos[0]?.caracteristicas[0]?.altoConfort ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo de alto confort
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {results?.vehiculos[0]?.caracteristicas[0]?.altasPrestaciones ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo con altas prestaciones
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {results?.vehiculos[0]?.caracteristicas[0]?.perfectoEstado ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo en perfecto estado
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {results?.vehiculos[0]?.precio[0]?.cancelacionGratis ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Cancelación gratuita
                            </div>
                        ) : null}
                    </li>
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
                    <div className={ styles["contenedor__desglose__total__precio-parrafo"] }>{precioAlquilerCalculado > 0 ? `${precioAlquilerCalculado}€` : '---'}</div>
                </div>
            </section>

            <section className={ styles["contenedor__desglose__total__final"] }>
                <div className={ styles["contenedor__desglose__total__final__precio"] }>
                    <div className={ styles["contenedor__desglose__total__final__precio-parrafoDia"] }>Precio por <span>1</span> día:</div>
                    {/* <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{precio}</span>€</div> */}
                    <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{results?.vehiculos[0]?.precio[0].por1DiaEuros}</span>€</div>
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
        // /vehiculoElegido
    );
};

export default CocheElegido;
