// esta es la index de la pagina principal

// import './app.css';
import Header from '../../components/header';
import BuscarVehiculo from '../buscarVehiculos';
import CalendarModal from '../../components/calendar-modal';
import { useState, useEffect, React } from 'react';

import ContactanosOcultoFooter from '../../components/footer/contactanos-oculto-footer';

// no valido import './buscarVehiculo.js'
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// no usados en .tsx
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';// desde la version 5 en adelante, se movio de '@mui/lab' a @mui/x-date-pickers;
import dayjs from 'dayjs';


import { Link, Route } from 'react-router-dom';

import SearchBar from './SearchBar';
import axios from 'axios';
//import { AppSearchAPIConnector} from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";


function Home() {

  // Definir la variable dataForm  
  const [dataForm, setDataForm] = useState({
    // dateFrom: new Date(sessionStorage.getItem('fechaDeRecogida1')) ?? new Date(),  // es un OR, si es nulo o invalido la izqda, cojfer el valor derecho
    // dateTo: new Date(sessionStorage.getItem('fechaDevolucion1')) ?? new Date(),
    dateFrom: new Date(),  // es un OR, si es nulo o invalido la izqda, cojfer el valor derecho
    dateTo: new Date(),
    selected: -1
  });

  // Obtener la fecha actual
  // const fechaActual = new Date();
  // console.log("valor: ", new Date() );


  // quitar los querySelector = useRef();

  //******************CALCULAR DIAS DIFERENCIA************************** */
  const date1 = dataForm.dateFrom;    //asi es String:     sessionStorage.getItem('fechaDeRecogida1');
  const date2 = dataForm.dateTo;     // sessionStorage.getItem('fechaDevolucion1');  // new Date('2023-01-10');
  console.log("date1:", date1, ", date2: ", date2);
  // Calculate the difference in days
  const differenceInMilliseconds = Math.abs(date2 - date1);
  // Math.abs(dayjs(dataForm.dateTo).format('DD/MM/YYYY') - dayjs(dataForm.dateFrom).format('DD/MM/YYYY'));
  const diasReservados = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  console.log("nº diasReservados: ", diasReservados);
  // SI quiero enviar + params al siguiente componente:
  const date1FormatoSeleccionada = dayjs(dataForm.dateFrom).format('DD/MM/YYYY');
  const date2FormatoSeleccionada = dayjs(dataForm.dateTo).format('DD/MM/YYYY');

  // Estado para controlar la visibilidad de la sección
  //const [seccionVisible, setSeccionVisible] = useState(true);
  const [seccionCalendarVisible, setseccionCalendarVisible] = useState(false);

  
  // Buscador ciudades ELK
  const [results, setResults] = useState([]);
  const searchApi = async (query) => {
    try {
      // OK  const response = await axios.get(`https://api.example.com/search?q=${query}`);  // ejecuta GET por cada letra se tecleea. EMpieza a ejecutar a partir de 3 letras tecleadas en el buscador
     
      //ok para mostrar 1 tabla. responde 1 array de objetos 
      // const response = await axios.get("https://jsonplaceholder.typicode.com/users");    //  da 10 users siempre
      
      // responde 1 objetos de elementos
      //OK const response = await axios.get(` https://myfakeapi.com/api/cars/name/${query}`);    // Mitsubishi ok
      const response = await axios.get(` http://localhost:8080/1A2b`); 
     

      //1A2B! ELK
     /* let response ="";    
      const requestOptions  = {
        method: 'POST',  //NECESARIO para enviar el body
        mode: 'no-cors', // Deshabilitar CORS
        headers: {
          'Content-Type': 'application/json',       
          'Accept': 'application/json',   
        },
        dataType: 'json',
        body: JSON.stringify({
          query: {
            bool: {
              should: [
                {
                  multi_match: {
                    query: 'z', //${query}
                    type: 'bool_prefix',
                    fields: [
                      'CiudadesVehiculo',
                      'CiudadesVehiculo._2gram',
                      'CiudadesVehiculo._3gram',
                    ],
                  },
                },
                { term: { Alquilable: 'S' } },
                {
                  fuzzy: {
                    CiudadesVehiculo: {
                      value: 'z',
                      fuzziness: 'auto',
                    },
                  },
                },
              ],
            },
          },
          fields: ['CiudadesVehiculo'],
          _source: false,
        }),
      };
      //aja const response = await axios.get(requestOptions); 
      const url = 'http://localhost:9200/vehiculos-v3-mappingv2defltmejorado/_search';
      // const url = new URL(baseUrl);
      // url.search = new URLSearchParams(queryParams).toString();
      fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta de Elasticsearch aquí
    console.log(data);
  })
    console.log(response.data); */

      
      // opciones de cars:(campo car del API) :  Mitsubishi, Volkswagen, Saturn, Jeep, Chevrolet, Dodge, Isuzu, ...

      //response.setResults="datos aja en js";
      setResults(response.data);
      // console.log(/*"resultados  consulta: "+*/ response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  useEffect(() => {
    // Este código se ejecutará después de que el componente se haya montado en el DOM
    // Puedes realizar acciones aquí, como hacer llamadas a API, suscribirte a eventos, etc.

    // Deshabilitar la sección después de que la página se ha cargado
    setseccionCalendarVisible(true);
  }, []); // El segundo argumento es un array de dependencias, en este caso, vacío para que se ejecute solo una vez


  function handleClick() {
    setseccionCalendarVisible(!seccionCalendarVisible)
  }


  const actualizarDiasReservadosFrom = (newValueDateFrom) => {
    alert(newValueDateFrom);

    // Se almacenan durante la sesion los diasReservados en sessionStorage
    sessionStorage.setItem('fechaDeRecogida1', newValueDateFrom);
  }

  const actualizarDiasReservadosTo = (newValueDateFrom) => {
    alert(newValueDateFrom);
    // alert(JSON.stringify(dataForm));

    sessionStorage.setItem('fechaDevolucion1', newValueDateFrom);
  }

  return (


    <div>
      { /*{ /* <!--Obtiene tamaño de la Ventana según cambie su tamaño--> */}
      {/*  header */}
      {/* <Header /> */}

      {/* en proceso: */}
      {/* <BuscarVehiculo></BuscarVehiculo> pdte:  API Maps */}
      {/* <main> { /* { /* <!--main--> */}
        <section className="jobs">{ /* { /* <!--imagen--> */}
          <div className="jobs__section">
            <h1 className="jobs_parrafo">Tu vehículo eléctrico de alquiler</h1>
            <img src="images/imagen-nav.jpg" className="jobs_img" />
            <div className="grid__container">
              <div className="grid grid_iconoLupa1">
                <img src="images/grid_iconoLupa1.svg" className="grid grid_iconoLupa1-1" />
              </div>
              <div className="grid grid_lugar2">Lugar de recogida</div>
              {/* <div className="grid grid_Barcelona3">Barcelona, Cataluña, España</div> */}
              <SearchBar onSearch={searchApi} />
             
                      {/* intento de search as you type   : 
                        <Layout
                        header={<SearchBox autocompleteSuggestions={true} />}  /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs} local="es">
                <Grid direction='row' container spacing={2} className="alinear-calendar-recogida">
                  {/* my={2.5} */}
                  <Grid item xs={12} sm={12} xl={3} lg={3}>
                    {/* {} es el número de columnas que un componente Grid ocupa en diferentes tamaños de pantalla. */}
                    <DatePicker
                      disablePast
                      // aja disableFuture
                      label='Date From - Fecha de recogida'
                      // minDate= {new Date() }
                      // defaultValue={dayjs('2023-12-17')}
                      value={dataForm.dateFrom}
                      onChange={(newValue) => {
                        // aja newValue es la nueva fecha que ha introducido
                        const formatoFechaDate = new Date(newValue !== null ? newValue.toString() : new Date());  // fuerza que siempre see 1 fecha al menos
                        // antes:                  dateTo: newValue
                        setDataForm({ ...dataForm, dateFrom: formatoFechaDate });
                        actualizarDiasReservadosFrom(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    // readOnly  
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
              {/* <div className="grid grid_iconoCalendario4">
                {/* onClick={ /* style={ .calendar__boton').style.display="block" } 
                <a href="#calendar__link" className="calendar__iconosCalendario">
                      <!--calendar link--> 
                  <img src="images/grid_iconoCalendario4.svg" className="grid grid_iconoCalendario4-1" onClick={handleClick} />
                </a>
              </div> */}
              <div className="grid grid_fecha_recogida5">Fecha de recogida</div>
              <div className="grid grid_fecha_recogida6">{dayjs(dataForm.dateFrom).format('DD/MM/YYYY')}</div>
              {/* <div className="grid grid_fecha_recogida5">Fecha de recogida</div>
              <div className="grid grid_fecha_recogida6">Dom 4 Dia</div> */}
              <div className="grid grid_iconoReloj7">
                <img src="images/grid_iconoReloj7.svg" className="grid grid_iconoReloj7-1" />
              </div>
              <div className="grid grid_horaEscogida8">Hora de recogida</div>
              <select className="grid grid_horaEscogida9" id="grid_horaEscogida9">
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
              </select>
              {/* Date To */}
              <LocalizationProvider dateAdapter={AdapterDayjs} local="es">
                <Grid direction='row' container spacing={2} className="alinear-calendar-fechadevolucion">
                  <Grid item xs={12} sm={12} xl={3} lg={3}>
                    <DatePicker            // renders DesktopDatePicker or MobileDatePicker depending on the device it runs on.
                      // aja disableFuture                  
                      label='Date To'
                      minDate={dataForm.dateFrom}
                      value={dataForm.dateTo}   // {dataForm.dateTo < new Date() ? new Date() : dataForm.dateTo}
                      onChange={(newValue) => {
                        // aja newValue es la nueva fecha que ha introducido
                        const formatoFechaDate = new Date(newValue !== null ? newValue.toString() : new Date());  // fuerza que siempre see 1 fecha al menos
                        // antes:                  dateTo: newValue
                        setDataForm({ ...dataForm, dateTo: formatoFechaDate });
                        actualizarDiasReservadosTo(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      format="YYYY/MM/DD"
                    // defaultValue={dayjs('2022-04-17')}
                    // slotProps={{
                    //   textField: {
                    //     helperText: 'MM/DD/YYYY',
                    //   },
                    // }}
                    // openTo="month"
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
              {/* <div className="grid grid_iconoCalendario10">
                <a href="#calendar__link" className="calendar__iconosCalendario">
                  { /*  <!--calendar link--> *
                  <img src="images/grid_iconoCalendario10.svg" className="grid grid_iconoCalendario10-1" />
                </a>
              </div> */}
              <div className="grid grid_fecha_Devolucion11">Fecha de devolución</div>
              <div className="grid grid_fechaDevolucion12">{dayjs(dataForm.dateTo).format('DD/MM/YYYY')}</div>
              {/* <div className="grid grid_fecha_Devolucion11">Fecha de devolución</div>
              <div className="grid grid_fechaDevolucion12">Mie 11 ene</div> */}

              <div className="grid grid_iconoReloj13">
                <img src="images/grid_iconoReloj13.svg" className="grid grid_iconoReloj13-1" />
              </div>
              <div className="grid grid_horaEscogida14">Hora de devolución</div>
              <select className="grid grid_horaEscogida15" id="grid_horaEscogida15">
                { /* { /* <!--onchange="seleccionarHora()"--> */}
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
              </select>
              <div className="contenedor__boton16">
                <a  className="boton16">{ /*  href="buscarVehiculo.html" { /* <!--calendar link--> */}
                  {/* <div className="grid grid_boton16">Buscar</div> */}
                  <div className="grid grid_boton16">                  
                      <Link to={{ pathname: '/busquedaVehiculos', state: { diasReservados, date1FormatoSeleccionada, date2FormatoSeleccionada }, }}>Buscar</Link>
                    
                  </div>

                </a>
              </div>
            </div>
          </div>
        </section>


        {
          seccionCalendarVisible && (
            <CalendarModal />
          )
        }
        <section className="contenedor__caja">
          <div className="contenedor__caja__parrafo">
            <h2 className="elemento-encabezado">e-FAST, EL NÚMERO 1 EN ALQUILER DE VEHÍCULOS ELÉCTRICOS</h2>
          </div>
        </section>{ /* <!--contenedor__caja de imagenes Coche y Moto--> */}
        <section className="contenedor__caja__vehiculos" id="vehiculos">
          <div className="contenedor__caja__vehiculos__dinamico">
            <div className="caja__tesla">{ /* <!--Coche Tesla--> */}
              <div className="caja__tesla__icono">
                <img src="images/iconoTeslaR.jpg" className="iconoTesla" />
              </div>
              <a href="teslaCaracteristicas.html" className="caja__tesla__imagen">
                <img src="images/tesla3.png" className="imagenCoche" />
              </a>
            </div>
          </div>
          <div className="contenedor__caja__vehiculos__dinamico">
            <div className="caja__motoZero">{ /* <!--Moto Zero--> */}
              <div className="caja__zero__icono">
                <img src="images/iconoMotoZero1.png" className="iconoZero" />
              </div>
              <a href="zeroCaracteristicas.html" className="caja__zero__imagen">
                <img src="images/Zero-SRF-360-9.png" className="imagenMoto" />
              </a>
            </div>
          </div>
        </section>
        { /* <!--CONTACTO Y CONTACTANOS OCULTO--> */}
        <ContactanosOcultoFooter></ContactanosOcultoFooter>

        {/* adañdir resto a partir de aqui. section anterior no esta bien etiquetado */}
        { /* <!--Contáctanos--> */}
        {/* <section className="contenedor__caja__contactanos">
          <div className="contenedor__caja__parrafo_contactanos">
            <h3 className="elemento-encabezado-cliente">Servicio exclusivo al cliente</h3>
            <button href="#contactos" className="boton__contáctanos">Contáctanos</button>
          </div>
        </section> */}

        {/* <ServicioExclusivoFooter></ServicioExclusivoFooter>

        <DescripyContactoFooter></DescripyContactoFooter> */}
      {/* </main> */}
      {/* <footer className="footer__informacion">
        <div className="footer__informacion__contacto">
          <p> e-fast, correo info@e-fast.com <br />Trabaja con nosotros | Aviso legal | Politica de cookies</p>
        </div>
      </footer> */}

      {/* <Footer></Footer> */}
    </div>
  );
}

export default Home;