// import { AddressSearch } from "./AddressSearch";
import "./App.css";
// import DatePicker from "./DatePicker";
import { useState } from "react";
import { VehicleTypeTab } from "./components/VehicleTypeTab";
import { FuelTypeTab } from "./components/FuelTypeTab";
import { AddressSearch } from "./components/AddressSearch";
import { BrandType } from "./components/BrandType";
import DatePicker from "./components/DatePicker";


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



function Form() {
  const [showDropoffInput, setShowDropoffInput] = useState(false);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const date = new Date(event.target.value);
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
    handleSelect([
      {
        startDate: selectedRange[0].startDate,
        endDate: date,
        key: "selection",
      },
    ]);
  };

  const handleSelect = (ranges) => {
    setSelectedRange([ranges[0]]);
  };
  const handleSelectDesktop = (ranges) => {
    setSelectedRange([ranges.selection]);
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
          selectedFuelTypes={selectedFuelTypes}
          handleOptionClick={handleFuelTypeClick}
        />
        <AddressSearch
          handleCheckboxChange={handleCheckboxChange}
          showDropoffInput={showDropoffInput}
        />
        <BrandType />
        <button 
          className="border border-gray-400 rounded-md p-1 text-lg text-gray-700 bg-blue-100"
          // onClick={""}
        >
          Buscar Vehiculos
          </button> 
      </div>      
      <div className="rounded-lg p-3 bg-gray-200 border border-gray-700 inline-flex flex-col shadow-2xl">
        <div className="bg-gray-200 [&>div>label]:text-gray-600 [&>div>label]:font-semibold [&>div>input]:bg-gray-200 [&>div>input]:text-gray-600 flex-col mx-auto justify-between p-2 xl:flex-row flex">
          <div className="mb-4">
            <label>pick up: </label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
            <div className="xl:hidden">
              <input
                type="date"
                value={selectedRange[0].startDate.toISOString().split("T")[0]}
                onChange={handleStartDateChange}
              />
            </div>
          </div>
          <div>
            <label>Drop off: </label>
            <input type="time" value={endTime} onChange={handleEndTimeChange} />
            <div className="xl:hidden">
              <input
                type="date"
                value={selectedRange[0].endDate.toISOString().split("T")[0]}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>
        <div className="xl:block">
        {/* https://www.npmjs.com/package/react-date-range */}
          <DatePicker
            selectedRange={selectedRange}
            handleSelect={handleSelectDesktop}
          />
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