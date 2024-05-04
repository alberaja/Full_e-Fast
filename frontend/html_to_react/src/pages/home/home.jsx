// esta es la index de la pagina principal

// import './app.css';
import Header from '../../components/header';
import BuscarVehiculo from '../buscarVehiculos';
import CalendarModal from '../../components/calendar-modal';
import { useState, useEffect, React } from 'react';

import ContactanosOcultoFooter from '../../components/footer/contactanos-oculto-footer';

// no valido import './buscarVehiculo.js'
import { Grid, TextField } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';

// no usados en .tsx
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';// desde la version 5 en adelante, se movio de '@mui/lab' a @mui/x-date-pickers;
import dayjs from 'dayjs';


import { Link, Route } from 'react-router-dom';

import SearchBar from './SearchBar';
import axios from 'axios';
//import { AppSearchAPIConnector} from "@elastic/search-ui-app-search-connector";

import Form from "./form.jsx";

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
        <section className="jobs bgimg">{ /* { /* <!--imagen--> */}
          <div className="jobs__section">
            {/* <h1 className="jobs_parrafo">Tu vehículo eléctrico de alquiler</h1> */}
            {/* aja: lo añado a CSS .jobs.bgimg  de estilo.css <img src="images/imagen-nav.jpg" className="jobs_img" /> */}

            <Form       />  {/*className="jobs_parrafo" */}
            
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