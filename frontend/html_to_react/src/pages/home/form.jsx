// import { AddressSearch } from "./AddressSearch";
import "./App.css";
// import DatePicker from "./DatePicker";
import { useState } from "react";
import { VehicleTypeTab } from "./components/VehicleTypeTab";
import { FuelTypeTab } from "./components/FuelTypeTab";
import { AddressSearch } from "./components/AddressSearch";
import { BrandType } from "./components/BrandType";
import DatePicker from "./components/DatePicker";
import { Link } from "react-router-dom";

import * as React from 'react';
import useSessionStorage from "../../hooks/session-storage";

import { isBefore } from 'date-fns';

function parseURL(input) {
  const params = new URLSearchParams(input);
  const tiposElectrico = params.getAll("option");
  //params.delete("option"); // tiposElectrico
  if (tiposElectrico.length > 0) {
    //  > 0
    params.set("option", tiposElectrico.join(","));
    //params.append("option", tiposElectrico.join(", ")); // .concat("&option=", tiposElectrico.join(","))
  }
  return params.toString();
}

function getTime(date) { // 05-03-2024T07:00
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

function getDate(date) {// 05-03-2024T07:00
  return `${date.getFullYear()}-${((date.getMonth() + 1) + "").padStart(2, "0")}-${(date.getDate() + "").padStart(2, "0")}`;
}

function setTime(date, newDate) {
  date.setHours(newDate.getHours());
  date.setMinutes(newDate.getMinutes());
  date.setSeconds(newDate.getSeconds());
}

function setDate(date, newDate) {
  date.setDate(newDate.getDate());
  date.setMonth(newDate.getMonth());
  date.setFullYear(newDate.getFullYear());
}

 function Form() {
  const [showDropoffInput, setShowDropoffInput] = useState(false);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  const currentDate = new Date(); // Obtener la fecha actual
  const day = String(currentDate.getDate()).padStart(2, '0'); // Obtener el día y agregar un 0 al principio si es necesario
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Obtener el mes y agregar un 0 al principio si es necesario
  const year = currentDate.getFullYear(); // Obtener el año  
  const formattedDateToday = `${day}-${month}-${year}`; // Formatear la fecha como "dd-mm-yyyy"

  const [range, setRange] = useSessionStorage("Rango", 
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }, 
    {
      handleGet: (value) => {
      const {key, startDate, endDate} = JSON.parse(value);
      return {
        key,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    },
    handleSet: ({startDate, endDate, key}) => JSON.stringify({
      key,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    })
  })

  const handleStartTimeChange = (event) => {
    setRange({
      ...range,
      startDate: new Date(event.target.value)
    });
  };

  const handleEndTimeChange = (event) => {
    setRange({
      ...range,
      endDate: new Date(event.target.value)
    });
  };

  const handleStartDateChange = (event) => {
    const date = new Date(event.target.value);
    const dateString = event.target.value;
    const parts = dateString.split('-'); // Dividir la cadena en partes usando el guion
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Reorganizar las partes para formar el formato deseado
    // setStartDate(/*event.target.value*/formattedDate); // establece el estado de la fecha de inicio
    handleSelect([
      {
        startDate: date,
        endDate: selectedRange[0].endDate,
        key: "selection",
      },
    ]);
  };

  const handleEndDateChange = (event) => {
    const date = new Date(event.target.value);
    const dateString = event.target.value;
    const parts = dateString.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //   if (endDate >= startDate) {
  //     // La fecha de endDate es mayor o igual que startDate
  //     // setEndDate(formattedDate);   // establece el estado
  //     // no lo uso
  //     handleSelect([
  //       {
  //         startDate: selectedRange[0].startDate,
  //         endDate: date,
  //         key: "selection",
  //       },
  //     ]);
  // } else {
  //   alert("La fecha de entrega debe ser mayor o igual que la fecha del inicio del alquiler");
  //   // setEndDate(startDate);
  // }    
  };

  const handleSelect = (ranges) => {
    setSelectedRange([ranges[0]]);
    console.log({selectedRange});
  };
  const handleSelectDesktop = (ranges) => {
    setSelectedRange([ranges.selection]);
    console.log({selectedRange});
  };

  const handleCheckboxChange = () => {
    setShowDropoffInput(!showDropoffInput);
  };

 
  const handleURLParams = (params, optionValue, setParams, name) =>{
    // console.log("handleURLParams!!");
  
    //guia: https://codesandbox.io/p/sandbox/ciudadesokpara-searchbar-copy-en-uc01-73jrvy?file=%2Fsrc%2FApp.js%3A18%2C1-28%2C2
    // Añade contenido a la vble params donde se forma toda URL. params puede consultarse con: console.log("params.toString():", params.toString());
    const newParams = new URLSearchParams(params);
    //const name = 'tiposVehiculo';
  
    console.log("OPTION", optionValue, name);

    if (newParams.has(name)) {
      const list = newParams.get(name).split(',');
      console.log("Initial list -> ", list);
  
      if (!list.includes(optionValue)) {
        list.push(optionValue);
      } else {
        const index = list.indexOf(optionValue);
        console.log("current index -> ", index);
        if (index > -1) {
          list.splice(index, 1);
        }
      }
  
      console.log("Final list -> ", list);
      if (list.length > 0) {
        newParams.set(name, list.join(','));
      } else {
        newParams.delete(name);
      }
    } else {
      const list = [optionValue];
      console.log({ list });
      newParams.append(name, list.join(','));
    }
  
    setParams(newParams);
  }

  const [params, setParams] = useState(
    new URLSearchParams(
      //TODO: setear solo al tener valores las 3 vbles requeridas
      "ciudadesVehiculo=Madrid&fechaHoraIni=05-03-2024T07:00&fechaHoraFin=08-03-2024T18:00"      
    )
  ); 
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const handleVehicleTypeClick = (optionValue) => {
// const { value, name, checked } = optionValue.target;  definri 
// console.log({name}+ name);
//const params = new URLSearchParams();
    // optionValue: valor de opc elegida: 
    // comprueba si ya esta presente en selectedVehicleTypes. Si está presente, se elimina de selectedVehicleTypes utilizando el método filter, que crea un nuevo array sin el valor especificado.
    if (selectedVehicleTypes.includes(optionValue)) {
      setSelectedVehicleTypes(
        selectedVehicleTypes.filter((value) => value !== optionValue)
      );
    } else {
      // Si optionValue no está presente en selectedVehicleTypes, se añade al array para crear un nuevo array con todos los elementos de selectedVehicleTypes más el nuevo valor optionValue.
      setSelectedVehicleTypes([...selectedVehicleTypes, optionValue]);
/*console.log({optionValue}, optionValue);
console.log({selectedVehicleTypes}, selectedVehicleTypes);
//console.log({params}, JSON.stringify(params.toString())); */
    }

    const name = 'tiposVehiculo';
    handleURLParams(params, optionValue, setParams, name);  
  };

  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const handleFuelTypeClick = (optionValue) => {
    if (selectedFuelTypes.includes(optionValue)) {
      setSelectedFuelTypes(
        selectedFuelTypes.filter((value) => value !== optionValue)
      );
    } else {
      setSelectedFuelTypes([...selectedFuelTypes, optionValue]);
    }

    const name = 'tiposElectrico';
    handleURLParams(params, optionValue, setParams, name);
  };

   // llamada del componente hijo(BrandType.jsx) al componete padre(form.jsx)   
   const callback = React.useCallback(
     (optionValue)=>{
        handleURLParams(params, optionValue, setParams, "marcaVehiculo")    
     }
   )

   const createHandleDate = (dateType) => (e) => {
    if(e.target.value === ""){
      return setRange((range) => ({
        ...range,
        [dateType]: dateType === "endDate"? range.startDate ?? new Date() : new Date()
      }))
    } 
    const newDate = new Date(e.target.value);
    if(dateType === "endDate" && newDate < range.startDate){ 
      setDate(newDate, range.startDate);
    }
    const date = dateType === "endDate" ? range.endDate : range.startDate;
    setTime(newDate, date);
    setRange((range) => ({
    ...range,
      [dateType]: newDate
    }));
   }

   const createHandleTime = (timeType) => (e) => {
    if(e.target.value === ""){
      return setRange((range) => ({
        ...range,
        [timeType]: new Date()
      }))
    } 
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newDate = new Date(timeType === "endDate" ? range.endDate : range.startDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if(timeType === "endDate" && isBefore( newDate, range.startDate)){
      setTime(newDate, range.startDate);
   
    }
    const date = timeType === "endDate" ? range.endDate : range.startDate;
    setDate(newDate, date);
    setRange((range) => ({
      ...range,
        [timeType]: newDate
      }));
   }
  return (
    <form
      action=""
      className="w-[90%] sm:w-[70%] flex p-5 border border-gray-800 m-4 rounded-xl bg-gray-300 justify-between mx-auto flex-col xl:flex-row"
    >
      <h5>URL compuesta: {parseURL(params.toString())}</h5>{" "}
      {/* aja: .sin_position : quitar la position: absolute; de .jobs_parrafo */}
       <h1 className="jobs_parrafo sin_position">Tu vehículo eléctrico de alquiler</h1>
      <div className="w-full flex flex-col p-5 gap-4"> {/*TODO: cargar desde APi no desde data.js*/}
        <VehicleTypeTab
          selectedVehicleTypes={selectedVehicleTypes}
          handleOptionClick={handleVehicleTypeClick}
        />
        <FuelTypeTab
          selectedFuelTypes={selectedFuelTypes}s
          handleOptionClick={handleFuelTypeClick}
        />
        <AddressSearch
          handleCheckboxChange={handleCheckboxChange}
          showDropoffInput={showDropoffInput}
        />
        <BrandType callback={callback}/>
        {/* //TODO: dejar <button> para mantener estilos asignados antes*/}
        <Link to={"/busquedaVehiculos?"+ params}
          className="border border-gray-400 rounded-md p-1 text-lg text-gray-700 bg-blue-100"
          // onClick={""}
          
        >
          Buscar Vehiculos
          </Link> 
      </div>      
      <div className="rounded-lg p-3 bg-gray-200 border border-gray-700 inline-flex flex-col shadow-2xl">
        <div className="bg-gray-200 [&>div>label]:text-gray-600 [&>div>label]:font-semibold [&>div>input]:bg-gray-200 [&>div>input]:text-gray-600 flex-col mx-auto justify-between p-2 xl:flex-row flex">
          <div className="mb-4">
            <label>pick up: </label>              
            {/* {console.log({startTime})} */}
            <input
              type="time"
              value={getTime(range.startDate)}
              onChange={createHandleTime("startDate")} 
            />
            <div className="xl:hidden">
              <input
                type="date"
                value={getDate(range.startDate)}
                onChange={createHandleDate("startDate")} 
              />
            </div>
          </div>
          <div>
            <label>Drop off: </label>
            <input 
              type="time" 
              value={getTime(range.endDate)} 
              onChange={createHandleTime("endDate")}
            />
            <div className="xl:hidden">
              {/* {console.log("selectedRange[0].endDate.toISOString().split('T')[0]: ", selectedRange[0].endDate.toISOString().split("T")[0] )} */}
              <input
                type="date"
                value={getDate(range.endDate)}  /* ej:  2024-05-04    */
                onChange={createHandleDate("endDate")}
              />
            </div>
          </div>
        </div>
        <div className="xl:block">
        {/* https://www.npmjs.com/package/react-date-range */}
          {/* <DatePicker
            // selectedRange={range}
            // handleSelect={handleSelectDesktop}
                //onChange={createHandleTime("startDate")} 
          /> */}
        </div>
        
      </div>
      {/* TODO: boton aqui */}
      {/* <div className="w-full flex flex-col p-5 gap-4">
      <button 
          className="border border-gray-400 rounded-md p-1 text-lg text-gray-700 bg-blue-100"
          // onClick={""}
        >
          Buscar Vehiculos
          </button> 
      </div> */}
    </form>
  );
}

export default Form;