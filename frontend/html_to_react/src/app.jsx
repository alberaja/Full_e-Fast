import logo from './logo.svg';
// import './App.css';
import Header from './components/header/index.jsx';
import { React } from 'react';
import Footer from './components/footer/index.jsx';
import ServicioExclusivoFooter from './components/footer/servicio-exclusivo-footer.jsx';
import DescripyContactoFooter from './components/footer/descrip-y-contacto-footer.jsx';
// no valido import './buscarVehiculo.js'
import { Grid, TextField } from '@mui/material';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // necesario BrowserRouter, ya que react-router-dom doesn't export a Router, instead, it exports a BrowserRouter
import Home from './pages/home/home.jsx';
// import PreHome from './PreHome.js.old';
import BusquedaVehiculos from "./pages/buscarVehiculos/index";
import CocheElegido from './pages/seleccionar-vehiculo/index';
import FinalizarReserva from './pages/finalizar-reserva/index.jsx';

// import { ModalProvider } from './ModalContext';
import ScrollToTop from './ScrollToTop.jsx';
// import Rutas from './pages/buscarVehiculos/old/filtrar-vehiculos.jsx';

  //r-router-dom v6
import { Routes } from 'react-router-dom/dist/index.js'
import { BrowserRouter } from "react-router-dom";
import ReservaFinalizada from './pages/reserva-finalizada/index.jsx';


function App() {

  // add JS  


  return (

// https://reactrouter.com/en/main/router-components/browser-router
<BrowserRouter>
    {/* <Router> */}      

      {/* forzar scroll arriba */}
      <ScrollToTop></ScrollToTop>

      {/* aja: <ModalProvider> Lo uso para hacer Global el Modal de contacto, así este Modal(formulario de contacto) NO es sólo de ambito local para el componente ServicioExclusivoFooter.jsx  */}
      {/* <ModalProvider> */}
      <Header />
      <main>
        {/* </ModalProvider> */}
        {/* Switch por Routes */}
        <Routes>
              <Route exact path="/" element={<Home></Home>} />
              {/* para que no falle /index.html, DEBE ir igual que la tuta / */}
              <Route exact path="/index.html" element={<Home></Home>} />
              {/* TODO: delete. ruta temp para probar filtros */}
              {/* <Route exact path="/filtrarVehiculos" element={<Rutas></Rutas>} /> */}
              <Route exact path="/busquedaVehiculos" element={<BusquedaVehiculos>  </BusquedaVehiculos>} />
              {/* :id necesario para que detecte el valor id de la URL */}
              <Route exact path="/vehiculoElegido/:id" element={<CocheElegido>  </CocheElegido>} />
              <Route exact path="/finalizarReserva" element={<FinalizarReserva>  </FinalizarReserva>} />
              <Route exact path="/reservaFinalizada" element={<ReservaFinalizada>  </ReservaFinalizada>} />
        </Routes>

        {/* aja: <ModalProvider> Lo uso para hacer Global el Modal de contacto, así este Modal(formulario de contacto) NO es sólo de ambito local para el componente ServicioExclusivoFooter.jsx  */}
        {/* <ModalProvider> */}
        <ServicioExclusivoFooter></ServicioExclusivoFooter>
        {/* </ModalProvider> */}
        <DescripyContactoFooter></DescripyContactoFooter>
      </main>
      <Footer></Footer>
            
    {/* </Router> */}
</BrowserRouter>

  );
}

export default App;