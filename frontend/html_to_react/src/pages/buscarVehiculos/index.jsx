// import styles from './buscarVehiculo.module.css';
import styles from './buscarVehiculo.css';
// import './buscarVehiculo.js'
import ServicioExclusivoFooter from '../../components/footer/servicio-exclusivo-footer';
// import ContactanosOcultoFooter from './components/footer/ContactanosOcultoFooter';
import DescripyContactoFooter from '../../components/footer/descrip-y-contacto-footer';
import CarsResultados from './cars-resultados.jsx';
import { useLocation } from "react-router-dom";

import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

 

import  DrawerMUI  from './drawer-mui.jsx';

export default function BuscarVehiculo() {

    // console.log(styles);

    const location = useLocation();   // visualizar los estados que llegan en una ruta de react router dom
    // console.log( location.state);
    let numdiasReservados = (location.state?.diasReservados ?? 0); // location.state.diasReservados ?? 0; //si puede dar nuto la primera variable, la inicializa con valor = 0 
    let date1 = (location.state?.date1FormatoSeleccionada ?? 0); //location.state.date1FormatoSeleccionada;
    let date2 = (location.state?.date2FormatoSeleccionada ?? 0); //location.state.date2FormatoSeleccionada;

    const [open, setOpen] = React.useState(false);
    const drawerWidth = 240;


    // boton para filtrar
    // const [filtro, setFiltro] = React.useState("");
    // React.useEffect(() => {
    //     if (filtro === "hidden") {
    //         document.querySelector('#elfiltro').classList.remove('hidden');
    //     } else {
    //         document.querySelector('#elfiltro').classList.add('hidden');
    //     }
    // }, [filtro]);

    //     const cambiaFiltro = () => {
    //         console.log({filtro});
    //         setFiltro(prevFiltro => prevFiltro == "hidden" ? "" : "hidden" )
    //     }

    // llamada del componente hijo(filtros.jsx) al componete padre(este index)
    // inicializar con los valores a filtrar(los default/del index )
    // const [paramsAFiltrar, setParamsAFiltrar] = React.useState("cajaCambio=&tiposElectrico=&tiposVehiculo=&maximoKmStr=&numPlazas=&ciudadesVehiculo=Madrid&fechaHoraIni=05-03-2024T07%3A00&fechaHoraFin=08-03-2024T18%3A00");
    // const callback = React.useCallback(
    //   (datos)=>{
    //     setParamsAFiltrar(datos)
    //   }
    // )
    // recuperar del Path los params a enviar al componente funcional '<CarsResultados>' 
    const params = location.search;
    


    return (
      //  <main> {/*<!--main-->*/}
      // <span>
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

        {/* <Drawer variant="permanent" open={true}
            sx={{
                display: { xs: 'block', sm: 'flex' },  //none
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}> holaaa
              <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    Accordion 1. 
                    Grupo filtros1
                    </AccordionSummary>
                    <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
                
              </Drawer> */}

        {/* ok boton para filtrar
        <button className='flex tablet:hidden' onClick={cambiaFiltro}>filtrar </button>
    <div className="flex">  {/*menufiltros      grid grid-cols-2    

        <div id='elfiltro' className="hidden  tablet:relative md:flex  w-1/4 bg-red-300">  {/* hidden fixed tablet:relative md:flex  w-1/4 bg-red-300
            filtro
        </div>
        <div className="flex">
            <Buscador1></Buscador1>
        </div>
    </div> */}

        <DrawerMUI ></DrawerMUI>
        {/* Hacer prop drilling   https://www.aluracursos.com/blog/que-es-prop-drilling : enviar datos de cambios de Filtros->index(esta)->Buscador1(añada los queryparams a la URL de la card de buscar vehiculos)*/}

        {console.log({params})  }
        {/* Listado de coches dinamico contra la API . Antiguo <Buscador1> */}
        <CarsResultados params={params} ></CarsResultados>

        {/********  aqui abajo todo estatico */}

        {/*<!--contenedor__caja de texto-->*/}
        {/*<!--Coche Tesla-->*/}
        <section className="contenedor__caja__vehiculos__tesla" id="vehiculos">
          <div className="contenedor__caja__vehiculos__dinamico__tesla">
            <div className="caja__tesla">
              <a href="" className="caja__tesla__imagen">
                <img src="images/tesla3.png" className="imagenCoche" />
              </a>
            </div>
          </div>
          <section className="producto__tesla">
            <div className="producto__tesla__parrafo">
              <h1 className="producto__tesla__parrafo">Tesla 3</h1>
            </div>
            <section className="producto__tesla__caracteristicas">
              <div className="producto__tesla__parrafo__caracteristicas">
                <div className="producto__tesla__parrafo__plazos">
                  <p className="producto__tesla__parrafo__plazas-p">
                    <img src="images/icono-user.svg" /> 5 plazas
                  </p>
                </div>
                <div className="producto__tesla__parrafo__plazos">
                  <p className="producto__tesla__parrafo__litros-p">
                    <img src="images/equipaje.svg" /> 649 litros
                  </p>
                </div>
                <div className="producto__tesla__parrafo__plazos">
                  <p className="producto__tesla__parrafo__autonomia-p">
                    <img src="images/bateria.svg" /> 547km autonomía
                  </p>
                </div>
              </div>
            </section>
          </section>
          <section className="barra__tesla">
            <div className="barra__tesla__precio">
              <div className="barra__tesla__precio__dia">
                <p className="precio__dia">Precio por 1 día</p>
                <h3 className="precio__dia__tesla-especifico">159€</h3>
                <img className="iconoCheck" src="images/check.svg" />
                <p className="barra__precio-Cancelacion__gratuita">
                  Cancelación gratuita
                </p>
              </div>
            </div>
            <a href="teslaElegido.html" className="barra__oferta__tesla">
              <div>Ver oferta</div>
            </a>
          </section>
        </section>
        {/*<!--contenedor__caja de imagenes Coche-->*/}
        {/*<!--Moto zero-->*/}
        <section className="contenedor__caja__vehiculos__Zero" id="vehiculos">
          <div className="contenedor__caja__vehiculos__dinamico__Zero">
            <div className="caja__zero">
              <a href="" className="caja__zero__imagen">
                <img src="images/Zero-SRF-360-9.png" className="imagenCoche" />
              </a>
            </div>
          </div>
          <section className="producto__zero">
            <div className="producto__zero__parrafo">
              <h1 className="producto__zero__parrafo">Zero SR/F</h1>
            </div>
            <section className="producto__zero__caracteristicas">
              <div className="producto__tesla__parrafo__caracteristicas">
                <div className="producto__zero__parrafo__velocidadPunta">
                  <p className="producto__zero__parrafo__velocidadPunta-p">
                    <img src="images/velocimetro.png" /> 200km/h
                  </p>
                </div>
                <div className="producto__zero__parrafo__tiempo__carga">
                  <p className="producto__zero__parrafo__tiempo__carga-p">
                    <img src="images/grid_iconoReloj7.svg" /> 2.4h cargarla
                  </p>
                </div>
                <div className="producto__zero__parrafo__autonomia">
                  <p className="producto__zero__parrafo__autonomia-p">
                    <img src="images/bateria.svg" /> 272km autonomía
                  </p>
                </div>
              </div>
            </section>
          </section>
          <section className="barra__zero">
            <div className="barra__zero__precio">
              <div className="barra__zero__precio__dia">
                <p className="precio__dia">Precio por 1 día</p>
                <h3 className="precio__dia__zero-especifico">79€</h3>
                <img className="iconoCheck" src="images/check.svg" />
                <p className="barra__precio-Cancelacion__gratuita">
                  Cancelación gratuita
                </p>
              </div>
            </div>
            <a href="zeroElegido.html" className="barra__oferta__zero">
              <div>Ver oferta</div>
            </a>
          </section>
        </section>

        {/*<!--CONTACTO Y CONTACTANOS OCULTO-->*/}
        {/* <section className="contenedor__contacto__contactanos" id="contactos">
                <section className="contenedor__cerrar">
                    <div className="contenedor__cerrar__contacto">
                        <div className="contendor__icono">
                            <a href="buscarVehiculo.html" className="contendor__icono__cerrado">
                                <img src="images/iconoCerrar.svg" className="iconoCerrar" />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="contenedor__logo" id="pago__realizado">
                    <div className="contenedor__logo__contacto">
                        <div className="">
                            <a href="" className="">
                                <img src="images/logo-empresa.png" className="iconoLogo" />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="reserva__realizada">
                    <div className="reserva__realizada__correctamente">
                        <h2 className="reserva__realizada__correctamente-p">Déjanos tus datos y contactaremos contigo lo antes posible.</h2>
                    </div>

                </section>

                <section className="contenedor__form">
                    <form action="" id="form" className="form">
                        {/*<!-- Nombre -->*
                        <div className="form__grupo" id="grupo__nombre">
                            <label htmlFor="nombre" className="form__label">Nombre</label>
                            <div className="form__grupo-input">
                                <input type="text" className="form__input" name="nombre" id="nombre" placeholder="felipe" />
                                <img className="form__validacion-estado" />
                            </div>
                            <p className="form__input-error">El nombre no puede estar vacio</p>
                        </div>
                        {/*<!-- Email -->*
                        <div className="form__grupo" id="grupo__email">
                            <label htmlFor="email" className="form__label">Email</label>
                            <div className="form__grupo-input">
                                <input type="email" className="form__input" name="email" id="email" placeholder="felipe@gma.com" />
                                <img className="form__validacion-estado" />
                            </div>
                            <p className="form__input-error">Completa el email</p>
                        </div>
                        {/*<!-- Teléfono -->*
                        <div className="form__grupo" id="grupo__telefono" />
                        <label htmlFor="telefono" className="form__label">Teléfono</label>
                        <div className="form__grupo-input">
                            <input type="number" className="form__input" name="telefono" id="telefono" placeholder="665842987" />
                            <img className="form__validacion-estado" />
                            <div />
                            <p className="form__input-error">Debe de haber 9 dígitos</p>
                        </div>
                        {/*<!-- Comentarios -->*
                        <div className="comentario__texto">
                            <label htmlFor="comentario">Comentarios</label>
                            <textarea ></textarea>
                        </div>
                        {/*<!-- terminos -->*
                        <div className="formulario__grupo" id="grupo__terminos">
                            <label className="formulario__label">
                                <p><input type="checkbox" className="cajaBox form__checkbox" name="terminos" id="terminos" />Acepto la <span style={{ color: 'blue' }}>política de privacidad</span> y el envío de comunicaciones informativas</p>
                            </label>
                        </div>
                        <button className="boton__enviar__formulario">ENVIAR</button>
                    </form>
                </section>
            </section> */}

        {/*<!--contenedor__caja de imagenes Coche-->*/}
        {/*<!--Contáctanos-->*/}

        {/* <ServicioExclusivoFooter></ServicioExclusivoFooter>

            <DescripyContactoFooter></DescripyContactoFooter> */}
        {/* </main> */}
        {/* </span> */}
      </>
    );
}