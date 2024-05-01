import logo from './logo.svg';
// import './App.css';
import Header from './components/header/index.jsx';
import CalendarModal from './components/calendar-modal/index.jsx';
import { useState, useEffect, React } from 'react';
import Footer from './components/footer/index.jsx';
import ServicioExclusivoFooter from './components/footer/servicio-exclusivo-footer.jsx';
import DescripyContactoFooter from './components/footer/descrip-y-contacto-footer.jsx';
// no valido import './buscarVehiculo.js'
import { Grid, TextField } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';

// no usados en .tsx
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';// desde la version 5 en adelante, se movio de '@mui/lab' a @mui/x-date-pickers;
import dayjs from 'dayjs';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // necesario BrowserRouter, ya que react-router-dom doesn't export a Router, instead, it exports a BrowserRouter
import Home from './pages/home/home.jsx';
// import PreHome from './PreHome.js.old';
import BusquedaVehiculos from "./pages/buscarVehiculos/index";
import CocheElegido from './pages/seleccionar-vehiculo/index';
import FinalizarReserva from './pages/finalizar-reserva/index.jsx';

// import { ModalProvider } from './ModalContext';
import ScrollToTop from './ScrollToTop.jsx';
import Rutas from './pages/buscarVehiculos/filtrar-vehiculos.jsx';


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
            <Home></Home>
          </Route>

          {/* para que no falle /index.html, DEBE ir igual que la tuta / */}
          <Route exact path="/index.html">
            {/* <Home /> */}
            <Home></Home>
          </Route>

          <Route exact path="/filtrarVehiculos">
            <Rutas></Rutas>
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



