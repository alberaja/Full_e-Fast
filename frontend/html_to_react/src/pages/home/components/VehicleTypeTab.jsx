/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from 'react';
import GetVehiclesTypes from './helpers/GetVehiclesTypes';
//ok fichero import data from './data';


export function VehicleTypeTab({selectedVehicleTypes, handleOptionClick} ) {
  const [isOpen, setIsOpen] = useState(false);

  // cuando un state se cambia, re renderiza todo. pero useRef no, queda en el mismo dom .
  const dropdownRef = useRef(null);

  // get del API para GetVehiclesTypes
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>      
      <GetVehiclesTypes onDataFetch={setData} />
  {data ? (  
      <div className="sm:hidden" ref={dropdownRef}>      
        <label htmlFor="tabs" className="sr-only">
          select vehicle type
        </label>
        <span
          onClick={toggleDropdown}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {selectedVehicleTypes.length ? selectedVehicleTypes.join(', ') : 'Select vehicle type'}
        </span>
        {/* mostrar los checkbox SOLO si tamaño de screen es pequeño */}
        {/* {isOpen && (
          <div className="absolute z-10 mt-1 w-[70%] bg-white border border-gray-300 rounded-md shadow-lg">
            {data.CarTypes.map((type, index) => (
              <label key={index} className="block p-2">
                <input
                  type="checkbox"
                  value={type.value}
                  checked={selectedVehicleTypes.includes(type.value)}
                  onChange={() => handleOptionClick(type.value)}
                  className="mr-2"
                />
                {type.value}
              </label>
            ))}
          </div>
        )} */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-[70%] bg-white border border-gray-300 rounded-md shadow-lg">
            {data.tiposVehiculo.map((type, index) => (
              <label key={index} className="block p-2">
                <input
                  type="checkbox"
                  value={type.valor}
                  checked={selectedVehicleTypes.includes(type.valor)}
                  onChange={() => handleOptionClick(type.valor)}
                  className="mr-2"
                />
                {type.valor}
              </label>
            ))}
          </div>
        )}
      </div>
     ) : ("")}
      {/* mostrar los botones alargados */}
      {/* className="hidden... :  desde small en adelante, hidden (display: none.) */}
           
      {/* <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
        {data.CarTypes.map((type, index, array) => (
          // por cada valor que venga en el array, le creamos un li, con un span dentro que muestra type.value
          <li key={index} className={`w-full`}>
            <span
              className={`cursor-pointer inline-block w-full p-4 text-gray-900 border-r border-gray-200 focus:ring-4 focus:ring-blue-300 active focus:outline-none focus-within:z-10 ${
                index === 0 ? 'rounded-l-lg' : index === array.length - 1 ? 'rounded-r-lg' : ''
              } ${array.length === 1 ? 'rounded-lg' : ''} ${
                selectedVehicleTypes.includes(type.value)
                  ? 'bg-gray-500 text-white font-normal hover:bg-gray-600'
                  : 'bg-gray-100 text-black font-normal hover:bg-gray-200'
              }`}
              aria-current="page"
              onClick={() => handleOptionClick(type.value)}
            >
              {type.value}
            </span>
          </li>
        ))}
      </ul> */}
  {data ? (
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
        {data.tiposVehiculo.map((type, index, array) => (
          // por cada valor que venga en el array, le creamos un li, con un span dentro que muestra type.value
          <li key={index} className={`w-full`}>
            <span
              className={`cursor-pointer inline-block w-full p-4 text-gray-900 border-r border-gray-200 focus:ring-4 focus:ring-blue-300 active focus:outline-none focus-within:z-10 ${
                index === 0 ? 'rounded-l-lg' : index === array.length - 1 ? 'rounded-r-lg' : ''
              } ${array.length === 1 ? 'rounded-lg' : ''} ${
                selectedVehicleTypes.includes(type.valor)
                  ? 'bg-gray-500 text-white font-normal hover:bg-gray-600'
                  : 'bg-gray-100 text-black font-normal hover:bg-gray-200'
              }`}
              aria-current="page"
              onClick={() => handleOptionClick(type.valor)}
            >
              {type.valor}
            </span>
          </li>
        ))}
      </ul>
    ) : ("")}
    </>
  );
}
