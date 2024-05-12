import React, { useState, useEffect } from 'react';
import axios from 'axios';

// para los inputs Search as you type 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';

/* eslint-disable react/prop-types */
export function AddressSearch({ handleCheckboxChange, showDropoffInput , callbackCiudades, callbackCiudadesDevolverVehiculo}) {
  const [ciudades, setCiudades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCiudadesDevolverVehiculo, setIsCiudadesDevolverVehiculo] = useState(false);
  //listado completo para usarlo en los serach as you type
  //const [ciudadesUnicas, setCiudadesUnicas] = useState([]);

  useEffect(() => {
    
    // Aquí realizar la llamada al API y establecerías la respuesta en el estado.   Iniciar en espacio blanco si en la API quito @NotBlank
      // reuso la vble showDropoffInput  para enviar true/false
    const apiUrl = `http://localhost:8088/api/efast/v1/ciudades?nombre=${searchTerm || ' '}`+ `&ciudadesDevolverVehiculos=`+ isCiudadesDevolverVehiculo; //false  ///ciudades?nombre     dropOff=false
    axios.get(apiUrl)     //`URL_DE_TU_API?search=${searchTerm}`
      .then(response => {
        // setRespuesta(response.data);
        setCiudades(response.data.ciudadesUnicas); //uniqueCitis        
      })
      .catch(error => {
        console.error('Error al obtener la respuesta de la API:', error);
      });
  }, [searchTerm]);

  const handleChange = (event) => {
    console.log("event.target", event.target.id);
    if(event?.target?.id.includes("autocompleteDevolverVehiculos")){
      setIsCiudadesDevolverVehiculo(true);
    } else {setIsCiudadesDevolverVehiculo(false);}
    setSearchTerm(event.target.value);
    //console.log('Valor seleccionadosss:', event.target.value);    
  };
  const handleCityClick = (event, city) => {
    // Aquí puedes realizar cualquier acción que necesites con el valor recibido    
    //setSearchTerm(city);
    //console.log('city', city)
    console.log('Valor handleCityClick:', city?.title);
    callbackCiudades(city?.title)
  };

  const handleCityClickDevolverVehiculo = (event, city) => {
    // Aquí puedes realizar cualquier acción que necesites con el valor recibido    
    //setSearchTerm(city);
    //console.log('city', city)
    console.log('Valor handleCityClick:', city?.title);
    callbackCiudadesDevolverVehiculo(city?.title)
  };

  // para los inputs Search as you type
  // const options = ciudades.map((option) => {
  //   const firstLetter = option.title[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });
  const options = ciudades.map((ciudad) => {
    //console.log('Valor seleccionado:', ciudad);
    const firstLetter = ciudad[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      title: ciudad,
      //console: console.log("ciudad escogidaOrigen", ciudad)
    };
  });
  // const handleChangeSearchasyouType = (event, value) => {
  //   console.log("event", event);
  //   //setSearchTerm(event.target.value);
  // };

  // colores a mostrar para el tooltip de los search as you type de las 2 ciudades
  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: '#0000ff',//aja, antes: theme.palette.primary.main,
    backgroundColor: 'rgb(0, 107, 214)' //'#180270',
     //lo comento aja
      // theme.palette.mode === 'light'
      //   ? lighten(theme.palette.primary.light, 0.85)
      //   : darken(theme.palette.primary.main, 0.8),
  }));
  
  const GroupItems = styled('ul')({
    padding: 0,
  });
  const [showNoOptionsMessage, setShowNoOptionsMessage] = useState(false);

  const handleInputChange = (event, value, reason) => {
   
  };
  

  return (
    <div className="flex flex-col gap-4 w-[100%] [&>div>input]:border [&>div>input]:shadow-sm [&>div>input]:border-gray-300 [&>div>input]:rounded-md [&>div>input]:bg-slate-100 [&>div>input]:text-gray-900 [&>div>input]:p-2 [&>div>input]:placeholder:text-gray-500 [&>div>label]:text-gray-700 [&>div>label]:font-semibold">
      <div className="flex flex-col gap-2 w-full ">
        {/* <label htmlFor="">Pick up </label> */}
        {/* <input
          type="text"
          className="w-full"
          placeholder="enter an address..."
          value={searchTerm}
          onChange={handleChange}
        /> */}
        {/* TODO: Componetizar los 2 Autocomplete:  */}
        <Autocomplete
              id="grouped-demo"
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300 }}
               renderInput={(params) => <TextField {...params} label="Lugar de recogida" />}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
               //value={()=>console.log("ccc")} //{searchTerm}
              onChange={handleCityClick  /*(event, ciudad)=> (console.log("ciudad elegida: ", ciudad)  )*/}
              //onKeyDownCapture={handleChange}
              onInputChange={handleChange}
              //onInputChange={()=>console.log("ccc")}
              //inputProps={{ onChange: handleChangeSearchasyouType }} // Aquí se pasa la función handleInputChange al evento onChange del input
              noOptionsText={ciudades.length === 0  ? "Introduce una ciudad" : "No options"} // Condicional para quitar el "No options" del div que aparece debajo. Se muestra al empezar a escribir.
              inputTitle={"Lugar de recogida"}  //TODO: Componetizar los 2 Autocomplete: cuando lo componetice, enviar la prop del titulo de esta forma
            />
        <div className="flex flex-col gap-2 w-full ">
          <input
            type="checkbox"
            className="w-5 h-5 "
            checked={showDropoffInput}            
            onChange={handleCheckboxChange}
          />
          {/* TODO: poner texto a las mismas alturas */}
          <label htmlFor="">diferent drop off location?</label> 
        </div>
         {/* Lista de elementos de la respuesta de la API */}
         {/*TODO: ponerle div+formato estilos o usar  Autosuggest from "react-autosuggest"; como en https://codesandbox.io/p/sandbox/ciudadesokpara-searchbar-api-m4prg7?file=%2Fsrc%2FSearchBar2.js%3A63%2C8-63%2C12  */}
          {/* <ul>
            {ciudades.map((ciudad, index) => (
              <li key={index} onClick={(e) => handleCityClick(ciudad)}> {/* e.target.value 
                 {ciudad}   {elemento.value} 
              </li>
            ))}
          </ul> */}
        
      </div>

      {/* <div className="flex flex-col gap-2 w-full ">
      <label htmlFor="">Pick up </label>
      <input
        type="text"
        className="w-full"
        placeholder="enter an address..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-2 w-full ">
        <input
          type="checkbox"
          className="w-5 h-5 "
          checked={showDropoffInput}            
          onChange={handleCheckboxChange}
        />
      
        <label htmlFor="">diferent drop off location?</label> 
      </div>
     
      <div className="relative">
        <button className="w-full bg-gray-100" onClick={toggleDropdown}>
          Select city
        </button>
        {dropdownOpen && (
          <ul className="absolute bg-white border border-gray-200 w-full">
            {ciudades.map((ciudad, index) => (
              <li key={index} onClick={() => handleCityClick(ciudad)}>
                {ciudad}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> */}

      {showDropoffInput && (
        <div className="flex flex-col gap-2 full">
          <label htmlFor="">Drop off</label>
          {/* TODO: (URL)+ `&dropOff=true`*/}
          {/* <input type="text" placeholder="enter an address..." /> */}
          <Autocomplete
              id="autocompleteDevolverVehiculos"
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300 }}
               renderInput={(params) => <TextField {...params} label="Lugar de devolución" />}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
               //value={()=>console.log("ccc")} //{searchTerm}
              onChange={handleCityClickDevolverVehiculo  /*(event, ciudad)=> (console.log("ciudad elegida: ", ciudad)  )*/}
              //onKeyDownCapture={handleChange}
              onInputChange={handleChange}
              //onInputChange={()=>console.log("ccc")}
              //inputProps={{ onChange: handleChangeSearchasyouType }} // Aquí se pasa la función handleInputChange al evento onChange del input
              noOptionsText={ciudades.length === 0  ? "Introduce una ciudad" : "No options"} // Condicional para quitar el "No options" del div que aparece debajo. Se muestra al empezar a escribir.
              
            />
        </div>
      )}
    </div>
  );
}
