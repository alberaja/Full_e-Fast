import { useEffect, useState } from 'react';
import styles from './teslaElegido.module.css';
//r-router-dom v5 import { useLocation , useHistory } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom"

import { useParams } from 'react-router-dom';

//ok antes import './buscarVehiculo.css';
import { Link } from 'react-router-dom';

import Card2 from './../../components/body/card2.jsx'

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import { useStoreVehiculo } from '../../zustand/store.js';



const CocheElegido = ({ /*results*/ }) => {
    // EL id lo recibo de la URL
    const { id } = useParams();
    const [results, setResults] = useState(null);


    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
     console.log("location.state:", location.state);
    let numdiasReservados = location?.state?.diasReservados ?? 0;   //si es undefined, devolver 0
    let coche = location?.state?.coche;
    //let precio = 30; //= location.state.price;    // = precioDiaEur   // precio ={results?.vehiculos[0]?.precio[0].por1DiaEuros}
    //let precioAlquilerCalculado = precio * numdiasReservados;
    let numPlazas = location?.state?.numPlazas;
    let capLitros = location?.state?.capLitros;
    let autonomiaKm = location?.state?.autonomiaKm;
    
    // Zustand
    const {setearValoresZustand_cardVehicleData, setearRentalData_datosReserva} = useStoreVehiculo()

    const location2 = useLocation();
      //r-router-dom v5 const history = useHistory();
      let navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
       // Estado inicial con todos los valores de los parámetros de búsqueda
  
        // Efecto para sincronizar los valores de búsqueda con el estado
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:8762/elastic-efast/api/efast/v1/vehiculos?idVehiculo=${id}`);
              //console.log(response.status)
              if(response.status !== 200 ){ navigate("/") /* r-router-dom v5 history.push("/") */}
              const data = await response.json();
            //   console.log(data);
            setResults(data);

            // recuperar precio para guardarlo en Zustand
            //let precioAlquilerCalculado = data?.vehiculos[0]?.precio[0].por1DiaEuros ? data?.vehiculos[0]?.precio[0].por1DiaEuros * numdiasReservados : 0;
            //console.log("data?.vehiculos[0]?.precio[0].precioOferta", data?.vehiculos[0]?.precio[0].precioOferta)
            const hasSpecialOffer = data?.vehiculos[0]?.precio[0].ofertaEspecial === true;
            const precio = hasSpecialOffer ? data?.vehiculos[0]?.precio[0].precioOferta : data?.vehiculos[0]?.precio[0].por1DiaEuros;
            let precioAlquilerCalculado = precio * numdiasReservados ?? null;
            //console.log("precioAlquilerCalculadoooo: ", precioAlquilerCalculado)
              // Zustand
              setearValoresZustand_cardVehicleData(data , precioAlquilerCalculado); 
              setearRentalData_datosReserva(precioAlquilerCalculado, numdiasReservados)
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          };
      
          fetchData();                    
    }, [id]);

    const hasSpecialOffer = results?.vehiculos[0]?.precio[0].ofertaEspecial === true;
    const precio = hasSpecialOffer ? results?.vehiculos[0]?.precio[0].precioOferta : results?.vehiculos[0]?.precio[0].por1DiaEuros;

    // let precioAlquilerCalculado = results?.vehiculos[0]?.precio[0].por1DiaEuros ? results?.vehiculos[0]?.precio[0].por1DiaEuros * numdiasReservados : null;
    // console.log("precioAlquilerCalculado=", results?.vehiculos[0]?.precio[0].por1DiaEuros, '*',numdiasReservados, precioAlquilerCalculado)
    let precioAlquilerCalculado = precio * numdiasReservados ?? null;
    console.log("precioAlquilerCalculado=", precio, '*',numdiasReservados, precioAlquilerCalculado)

   
    //console.log("results-->", results) //map para el Array     
    const vehiculoElegido = results?.vehiculos?.map(coche => <Card2 key={coche.id} {...coche}></Card2>)
       
        //control de buscar 1 id de vehiculo q no responde vehiculos
        useEffect(() => {
            // console.log("vehiculoElegido", vehiculoElegido);        
            if (vehiculoElegido === null) {
              console.log("No se encontraron vehículos.");
              navigate('/');
            } else if (Array.isArray(vehiculoElegido) && isObjectEmpty(vehiculoElegido)) {
              console.log("vehiculoElegido está vacío.");
              navigate('/');
            }
          }, [vehiculoElegido, navigate]);

        const isObjectEmpty = (obj) => {
            return Object.keys(obj).length === 0;
        };

    return (
        <>    
            <section className={ styles["contenedor__eleccion"] } >
                <div className="contenedor__eleccion__tu">
                    <h3 className="contenedor__eleccion-parrafo">Tu elección</h3>
                </div>
            </section>
           
            {/* {precio =results?.vehiculos[0]?.precio[0].por1DiaEuros} */}
            {/* TODO:  componetizar mas el de cards de search-results-carsEFast.jsx */}
                    {/* {console.log('resultadoActivo:',{results})} */}        
            {vehiculoElegido}  {/* Mostrar la <Card2/>   */}
           
            
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
                        {results?.vehiculos[0]?.caracteristicas[0]?.maximodeKm >= 100 ? (
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
                    {/* <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{fetchedResults?.vehiculos[0]?.precio[0].por1DiaEuros}</span>€</div> */}
                    <div className={ styles["contenedor__desglose__total__final__precio-parrafo"] }><span>{precio}</span>€</div>
                    {/* <span>159</span>€</div> */}
                </div>
                <div className={ styles["contenedor__boton__reserva"] }>
                    <a className={ styles["contenedor__boton"] }>
                        {/* href="teslaReservar.html" */}                       
                        {/* aplicarlo asi a todos los botones!! */}
                            {/* para el color del <a><a/> del button poner: color: white; */}
                        <div className={ styles["contenedor__boton-forma"] }>                            
                            <Link
                                to={ '/finalizarReserva' }
                                state= {{
                                    numdiasReservados,
                                    coche,
                                    price: precio,
                                    precioAlquilerCalculado
                                }
                            }
                            >
                                Continuar con la reserva
                            </Link>
                        </div>
                    </a>
                </div>
            </section>            
        </>
        // /vehiculoElegido
    );
};



export default CocheElegido;
