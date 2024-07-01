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




import { transformdata } from '../../components/body/transformData';

import { useEffect , useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
//ok antes import './buscarVehiculo.css';
import styles from './teslaElegido.module.css';
import { useStoreVehiculo } from '../../zustand/store';

const SearchResultsCarsEFast = ({ results , numDiasRangoEntreFechas}) => {
    // EL id lo recibo de la URL
    const { id } = useParams();
    // renombro results a "fetchedResults" para evitar fallo de q ya recibe results 
    const [fetchedResults, setFetchedResults] = useState(null);

    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:8762/elastic-efast/api/efast/v1/vehiculos?idVehiculo=${id}`);
              //console.log(response.status)
              if(response.status !== 200 ){ navigate("/") /* r-router-dom v5 history.push("/") */}
              const data = await response.json();
            //   console.log(data);
            setFetchedResults(data);
              // Aquí puedes manejar la respuesta de la llamada GET
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          };
      
          fetchData();
    }, [id]);


    // ver que llega
    // console.log(results.Cars);
    //let diasReservados = numDiasRangoEntreFechas;//= 5;
    //sessionStorage.getItem('diasReservados') ?? new Date(); 

    const {carData} = useStoreVehiculo();
    let numdiasReservados = carData.numeroDiasReservados ?? 0;
    // Si tiene oferta (ofertaEspecial=true)--> recuperar precio oferta(precioOferta, en lugar de por1DiaEuros)
    // Verificar si fetchedResults contiene la oferta especial
    const hasSpecialOffer = fetchedResults?.vehiculos[0]?.precio[0].ofertaEspecial === true;
    const precio = hasSpecialOffer ? fetchedResults?.vehiculos[0]?.precio[0].precioOferta : fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros;
    //let precioAlquilerCalculado = fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros ? fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros * numdiasReservados : null;
    let precioAlquilerCalculado = fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros ? fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros * numdiasReservados : null;
    console.log("precioAlquilerCalculado=", precio, '*',numdiasReservados, precioAlquilerCalculado)
    return (
      //  Cards
      // <!--Coche Tesla-->
      <>
        <section className={styles["contenedor__eleccion"]}>
          <div className="contenedor__eleccion__tu">
            <h3 className="contenedor__eleccion-parrafo">Tu elección</h3>
          </div>
        </section>        
        <main>
          <div className=" px-5 py-24 mx-auto  flex flex-col gap-4">
            {fetchedResults &&
              fetchedResults.vehiculos?.map((coche) => {
                const props = transformdata(coche);
                const urlVar = {
                  pathname: "/vehiculoElegido/" + coche.id,
                  state: {
                    numDiasRangoEntreFechas /*, coche: coche.car_model, price: coche.price*/,
                  },
                };
                //const linkProps = {diasReservados}
                return (
                  <Card
                    {...props}
                    url={urlVar}
                    idCar={coche.id} /*diasReservados={diasReservados}*/
                  />
                );
              })}
          </div>
          {/* <!--contenedor__caja de imagenes Coche-->  */}
        </main>
        <section className={styles["contenedor__inluido"]}>
          <div className={styles["contenedor__inluido_precio"]}>
            <h3 className={styles["contenedor__inluido_precio-parrafo"]}>
              Incluye en el precio
            </h3>
          </div>
        </section>
        <section className={styles["contenedor__inluido__cancelacion"]}>
          <ul className={styles["contenedor__inluido__cancelacion__precio"]}>
            <li
              className={
                styles["contenedor__inluido__cancelacion__precio-parrafo"]
              }
            >  
            {/* fetchedResults en lugar de results */}
              {fetchedResults?.vehiculos[0]?.precio[0]?.cancelacionGratis ? (
                <div>
                  {/* Si cancelacionGratis es true, se muestra el icono y el texto */}
                  {/* <img className={styles["iconoCheck1"]} src="/images/check.svg" /> */}
                  <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                  &nbsp; Cancelación gratuita hasta 48 horas antes de la
                  recogida
                </div>
              ) : null}
            </li>
            <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                        {fetchedResults?.vehiculos[0]?.seguro[0]?.coberturaParcialcolisionFranquicia ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                 {/* 1450€ */}
                                 &nbsp; Cobertura parcial por colisión con franquicia de {fetchedResults?.vehiculos[0]?.seguro[0]?.coberturaParcialcolisionFranquiciaQty}€
                            </div>
                        ) : null}
                    </li>
            <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                {fetchedResults?.vehiculos[0]?.seguro[0]?.coberturaRobo ? (
                    <div>                                
                        <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                                                                            {/* 1450€ */}
                        &nbsp; Cobertura en caso de robo con franquicia de {fetchedResults?.vehiculos[0]?.seguro[0]?.coberturaRobocolisionFranquiciaQty}€
                    </div>
                ) : null}
            </li>
            <li className={styles["contenedor__inluido__cancelacion__precio-parrafo"]}>
                {/* 10000000000	"=Ilimitado , sino es Limitado*/}
                {fetchedResults?.vehiculos[0]?.caracteristicas[0]?.maximodeKm === 10000000000 ? (
                    <div>                                
                        <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                        &nbsp; Kilometraje ilimitado
                    </div>
                ) :  (                  /* Kilometraje Limitado*/
                        <div>  <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />
                        &nbsp; Kilometraje hasta {fetchedResults?.vehiculos[0]?.caracteristicas[0]?.maximodeKm} kms </div>
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
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {fetchedResults?.vehiculos[0]?.caracteristicas[0]?.altoConfort ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo de alto confort
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {fetchedResults?.vehiculos[0]?.caracteristicas[0]?.altasPrestaciones ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo con altas prestaciones
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {fetchedResults?.vehiculos[0]?.caracteristicas[0]?.perfectoEstado ? (
                            <div>                                
                                <CheckTwoToneIcon style={{ color: "rgb(31, 153, 39)" }} />                                                                                  
                                &nbsp; Vehículo en perfecto estado
                            </div>
                        ) : null}
                    </li>
                    <li className={styles["contenedor__inluido__muyBuena__eleccion-parrafo"]}>
                        {fetchedResults?.vehiculos[0]?.precio[0]?.cancelacionGratis ? (
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
                    
                    {/* <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros}</span>€</div> */}
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
                                to={ '/finalizarReserva' }
                                // state= {{
                                //     numdiasReservados,
                                //     carData, //carData es de Zustand     //coche,
                                //     price: precio,
                                //     precioAlquilerCalculado
                                //     }
                                // }
                                
                                // state={ {
                                //     numdiasReservados,
                                //     carData,
                                //     precio,
                                //     precioAlquilerCalculado
                                //     }
                                // }                                
                            >
                                Continuar con la reserva
                            </Link>
                        </div>
                    </a>
                </div>
            </section>

      </>
    );
};

export default SearchResultsCarsEFast;
