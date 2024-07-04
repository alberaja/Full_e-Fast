/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from 'react';
import data from './data';

export function FuelTypeTab({selectedFuelTypes, handleOptionClick}) {
  const [isOpen, setIsOpen] = useState(false);
 
  const dropdownRef = useRef(null);

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
      <div className="lg:hidden" ref={dropdownRef}>
        <label htmlFor="tabs" className="sr-only">
          Selecciona el tipo de eléctrico
        </label>
          {/* TODO: quitar/(no mostrar valores de selectedFuelTypes y mostrar los de type.valueHuman) */}
          <span
            onClick={toggleDropdown}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {selectedFuelTypes.length ? selectedFuelTypes.join(', ') : 'Selecciona el tipo de eléctrico'}
          </span>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-[70%] bg-white border border-gray-300 rounded-md shadow-lg">
            {data.FuelTypes.map((type) => (
              <label key={type.id} className="block p-2">
                <input
                  type="checkbox"
                  value={type.valueHuman}
                  checked={selectedFuelTypes.includes(type.value)} /* type.valueHuman */
                  onChange={() => handleOptionClick(type.value)} /* type.valueHuman */
                  className="mr-2"
                />
                {type.valueHuman}
              </label>
            ))}
          </div>
        )}
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex divide-x">
        {data.FuelTypes.map((type, index, array) => (
          <li key={index} className="w-full">
            <span
              className={`cursor-pointer inline-block w-full h-full p-4 text-xs focus:ring-4 focus:ring-blue-300 active focus:outline-none focus-within:z-10 divide-x ${
                index === 0 ? 'rounded-l-lg' : index === array.length - 1 ? 'rounded-r-lg' : ''
              } ${array.length === 1 ? 'rounded-lg' : ''} ${
                selectedFuelTypes.includes(type.value) /* type.valueHuman */
                  ? 'bg-gray-500 text-white font-normal hover:bg-gray-600'
                  : 'bg-gray-100 text-black font-normal hover:bg-gray-200'
              }`}
              onClick={() => handleOptionClick(type.value)}  /* type.valueHuman */
              aria-current="page"
            >
              {type.valueHuman}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
