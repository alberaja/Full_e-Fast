import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* eslint-disable react/prop-types */
export function AddressSearch({ handleCheckboxChange, showDropoffInput }) {
  const [ciudades, setCiudades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Aquí realizar la llamada al API y establecerías la respuesta en el estado
    const apiUrl = `http://localhost:8088/api/efast/v1/search-city?name=${searchTerm}`+ `&dropOff=false`;
    axios.get(apiUrl)     //`URL_DE_TU_API?search=${searchTerm}`
      .then(response => {
        // setRespuesta(response.data);
        setCiudades(response.data.uniqueCitis);
      })
      .catch(error => {
        console.error('Error al obtener la respuesta de la API:', error);
      });
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCityClick = (city) => {
    // Aquí puedes realizar cualquier acción que necesites con el valor recibido
    console.log('Valor seleccionado:', city);
    setSearchTerm(city);
  };
  

  return (
    <div className="flex flex-col gap-4 w-[100%] [&>div>input]:border [&>div>input]:shadow-sm [&>div>input]:border-gray-300 [&>div>input]:rounded-md [&>div>input]:bg-slate-100 [&>div>input]:text-gray-900 [&>div>input]:p-2 [&>div>input]:placeholder:text-gray-500 [&>div>label]:text-gray-700 [&>div>label]:font-semibold">
      <div className="flex flex-col gap-2 w-full ">
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
          {/* TODO: poner texto a las mismas alturas */}
          <label htmlFor="">diferent drop off location?</label> 
        </div>
         {/* Lista de elementos de la respuesta de la API */}
         {/*TODO: ponerle div+formato estilos o usar  Autosuggest from "react-autosuggest"; como en https://codesandbox.io/p/sandbox/ciudadesokpara-searchbar-api-m4prg7?file=%2Fsrc%2FSearchBar2.js%3A63%2C8-63%2C12  */}
          <ul>
            {ciudades.map((ciudad, index) => (
              <li key={index} onClick={(e) => handleCityClick(ciudad)}> {/* e.target.value */}
                 {ciudad}  {/* {elemento.value} */}
              </li>
            ))}
          </ul>
        
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
          <input type="text" placeholder="enter an address..." />
        </div>
      )}
    </div>
  );
}
