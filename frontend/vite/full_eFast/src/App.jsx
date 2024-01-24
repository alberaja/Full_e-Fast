import logo from './logo.svg';
import './App.css';
import './pages/FinalizarReserva/teslaReservar.css';   //prueba de import css en vite
import Header from './components/header';
// import BuscarVehiculo from './pages/buscarVehiculos';
import CalendarModal from './components/calendar-modal';
import { useState, useEffect, React } from 'react';
import Footer from './components/footer';
import ServicioExclusivoFooter from './components/footer/ServicioExclusivoFooter';
import ContactanosOcultoFooter from './components/footer/ContactanosOcultoFooter';
import DescripyContactoFooter from './components/footer/DescripyContactoFooter';
// no valido import './buscarVehiculo.js'
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// no usados en .tsx
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';// desde la version 5 en adelante, se movio de '@mui/lab' a @mui/x-date-pickers;
import dayjs from 'dayjs';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // necesario BrowserRouter, ya que react-router-dom doesn't export a Router, instead, it exports a BrowserRouter
// import Home from './Home';
import PreHome from './PreHome';
import BusquedaVehiculos from "./pages/buscarVehiculos/index";
import CocheElegido from './pages/seleccionarVehiculo';
import FinalizarReserva from './pages/FinalizarReserva';

// import { ModalProvider } from './ModalContext';
import ScrollToTop from './ScrollToTop';


// export interface Ilist {
//   id: number,
//   descriptions: string
// }

function App() {

  // add JS  


  return (

    <Router>
      {/* add div y main.... partes comun    <div>
          <Header />  */}
      {/* <Header /> */}

      {/* forzar scroll arriba */}
      <ScrollToTop></ScrollToTop>

      {/* aja: <ModalProvider> Lo uso para hacer Global el Modal de contacto, así este Modal(formulario de contacto) NO es sólo de ambito local para el componente ServicioExclusivoFooter.jsx  */}
      {/* <ModalProvider> */}
      <Header />
      <main>
        {/* </ModalProvider> */}
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
            <PreHome></PreHome>
          </Route>

          {/* para qeu no falle /index.html, DEBE ir igual que la tuta / */}
          <Route exact path="/index.html">
            {/* <Home /> */}
            <PreHome></PreHome>
          </Route>



          <Route exact path="/busquedaVehiculos">
            <BusquedaVehiculos>  </BusquedaVehiculos>

            {/* <Footer></Footer> */}
          </Route>

          <Route exact path="/cocheElegido">
            {/* ?id= */}
            <CocheElegido>  </CocheElegido>

            {/* <Footer></Footer> */}
          </Route>

          <Route exact path="/finalizarReserva">
            {/* ?id= */}
            <FinalizarReserva>  </FinalizarReserva>

            {/* <Footer></Footer> */}
          </Route>

        </Switch>

        {/* aja: <ModalProvider> Lo uso para hacer Global el Modal de contacto, así este Modal(formulario de contacto) NO es sólo de ambito local para el componente ServicioExclusivoFooter.jsx  */}
        {/* <ModalProvider> */}
        <ServicioExclusivoFooter></ServicioExclusivoFooter>
        {/* </ModalProvider> */}
        <DescripyContactoFooter></DescripyContactoFooter>
      </main>
      <Footer></Footer>
      {/* </div>  */}
    </Router>


  );
}

export default App;
