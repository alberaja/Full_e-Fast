
import React, { useState, useEffect } from 'react';
// import SearchBar from './components/SearchBar';
import SearchResultsCars from '../../components/body/search-results-cars.jsx';
import axios from 'axios';

import { useModal } from '../../hooks/modal.jsx';
import FilterModal from '../../components/filter-modal/index.jsx';


import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//  modificar los Query String de las URLs
// import { useSearchParams } from "react-router-dom";

export default function CarsResultados({params}) {    //deserializar el objeto del prop a un string, yaq por default es 1 objeto

  //  modificar los Query String de las URLs
  // let [searchParams, setSearchParams] = useSearchParams();
  // const App = () => {
    const [results, setResults] = useState([]);

    const searchApi = async (query) => {
      try {
        // OK  const response = await axios.get(`https://api.example.com/search?q=${query}`);  // ejecuta GET por cada letra se tecleea. EMpieza a ejecutar a partir de 3 letras tecleadas en el buscador
        {console.log("paramsAFiltrar del hijo: "+JSON.stringify(params) )}
        //ok para mostrar 1 tabla. responde 1 array de objetos 
        // const response = await axios.get("https://jsonplaceholder.typicode.com/users");    //  da 10 users siempre
        // responde 1 objetos de elementos
        const response = await axios.get(` https://myfakeapi.com/api/cars/name/${query}`);
        
        // opciones de cars:(campo car del API) :  Mitsubishi, Volkswagen, Saturn, Jeep, Chevrolet, Dodge, Isuzu, ...

        //response.setResults="datos aja en js";
        setResults(response.data);
        // console.log(/*"resultados  consulta: "+*/ response.data);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };

    //  modificar los Query String de las URLs
    // desde react r dom 6.0.0 :    https://reactrouter.com/en/main/hooks/use-search-params#usesearchparams
    // setSearchParams(campos);
    const filtrarCampos =(campos) => {
      console.log(campos)    // campos=valor seleccionado en el input type=radio del index de FilterModal.jsx
      
    };

    useEffect(() => {
      // Realizar una búsqueda inicial al cargar la página
      //searchApi('initialQuery');  // valor de la busqueda inicial
      searchApi('Mitsubishi');
    }, []); // El array de dependencias vacío asegura que solo se ejecute al montar el componente


    // para Drawer
    const [ setOpen] = React.useState(false);
    const drawerWidth = 240;   
    
  // };

  const { open, handleOpen, handleClose } = useModal();
  

  return (
    <>
    <div>


       {/* <Drawer variant="permanent" open={true}
            sx={{
                display: { xs: 'block', sm: 'none' },
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

              
    </div>


    <div>
      {/* <button className="boton__contáctanos" onClick={handleOpen}>Filtrar Resultados</button> */}
      {/* <FilterModal isOpen={open} handleClose={handleClose} onFilter={filtrarCampos} /> */}

      <h3>Resultados para esas fechas:</h3>        
      {/* <SearchBar onSearch={searchApi} /> */}      
     
      <SearchResultsCars  results={results} />
    </div>

    </>
  );

}