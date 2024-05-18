import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
//r-router-dom v5 import { useHistory, useLocation, useParams } from "react-router-dom";
import { useNavigate, useLocation, useParams } from "react-router-dom"


// iconos
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationTwoToneIcon from "@mui/icons-material/EvStationTwoTone";
// import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";

const LABELS = {
  cajaCambio: "Caja de cambio",
  tiposElectrico: "Eléctricos",
  tiposVehiculo: "Vehículos",
  maximoDeKms: "Kilómetros",
  maximoNumPlazas: "Nº de Plazas",
};

const NAMES = {
  cajaCambio: "cajaCambio",
  tiposElectrico: "tiposElectrico",
  tiposVehiculo: "tiposVehiculo",
  maximoDeKms: "maximoKmStr",
  maximoNumPlazas: "numPlazas",
};


const MenuFiltroscheckboxDinamicos = ({ results }) => {
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
console.log("----queryParams", paramsToObject(location.search));


  const [queryParamsState, setQueryParamsState] = useState({
    // evitar recibir params en vacio
    // ciudadesVehiculo: "",
    // fechaHoraIni: "",
    // fechaHoraFin: "",
    // tiposVehiculo: [],
    // tiposElectrico: [],
    // cajaCambio: [],    
    // maximoKmStr: [],
    // numPlazas: [],

    // aqui debo recibir todos los valores que setee(en 'params') desde el /index, por ej tb marcaVehiculo
    //no usar getAll, get para evitar fallo . Hacer el split(',') solo para los que puedan llegar concatenados
    ciudadesVehiculo: queryParams.get('ciudadesVehiculo') || '',
    fechaHoraIni: queryParams.get('fechaHoraIni') || '',
    fechaHoraFin: queryParams.get('fechaHoraFin') || '',
    tiposVehiculo: queryParams.get('tiposVehiculo')?.split(',') || [],
    tiposElectrico: queryParams.get('tiposElectrico')?.split(',') || [],
    cajaCambio: queryParams.get('cajaCambio') || [],

    maximoKmStr: queryParams.get('maximoKmStr') || [],
    numPlazas: queryParams.get('numPlazas') || [],
    
    marcaVehiculo: queryParams.get('marcaVehiculo')?.split(',') || [],
  });

  const isChecked = (name, value) => {
    return queryParamsState[name].includes(value);
  };

  // const handleCheckboxChange = (event) => {
  //   const { name, value, checked } = event.target;
  //   setQueryParamsState((prevParamsState) => {
  //     let updatedValue;
  //     if (checked) {
  //       updatedValue = prevParamsState[name]
  //         ? `${prevParamsState[name]},${value}`
  //         : value;
  //     } else {
  //       const values = prevParamsState[name].split(",").filter((val) => val !== value);
  //       updatedValue = values.join(",");
  //     }
  //     return {
  //       ...prevParamsState,
  //       [name]: updatedValue,
  //     };
  //   });
  // };


  // Función para manejar cambios en los checkboxes
  // const handleCheckboxChangeModoJS = (event, valorHumano) => {    
  //   const { name, checked, value } = event.target;
  //   // {console.log(" event.target:", event.target)}
  //   if(name === 'tiposVehiculo'){
  //   setQueryParamsState((prevState) => ({
  //     ...prevState,   //copia todas las propiedades del estado anterior en el nuevo estado
  //     [name]: name === 'cajaCambio'  || name ==='tiposVehiculo' || name ==='tiposElectrico' || name ==='maximoKmStr' || name ==='numPlazas' //añadir tantos como nombres de grupos de cada accordeon tenga
  //       ? checked ? [...prevState[name], valorHumano]  : prevState[name].filter((item) => item !== valorHumano)
  //       : prevState[name],
  //   }));
  // } else {
  //   setQueryParamsState((prevState) => ({
  //     ...prevState,   //copia todas las propiedades del estado anterior en el nuevo estado
  //     [name]: name === 'cajaCambio'  || name ==='tiposVehiculo' || name ==='tiposElectrico' || name ==='maximoKmStr' || name ==='numPlazas' //añadir tantos como nombres de grupos de cada accordeon tenga
  //       ? checked ? [...prevState[name], value]  : prevState[name].filter((item) => item !== value)
  //       : prevState[name],
  //   }));
  // }
  // }; 
  // const handleCheckboxChangeModoJS = (event) => {
  //   const { name, checked, value } = event.target;
  //   setQueryParamsState((prevState) => ({
  //     ...prevState,
  //     [name]: name === 'cajaCambio'  || name ==='tiposVehiculo' || name ==='tiposElectrico' || name ==='maximoKmStr' || name ==='numPlazas'  //añadir tantos como nombres de grupos de cada accordeon tenga
  //       ? checked
  //         ? [...prevState[name], value]
  //         : prevState[name].filter((item) => item !== value)
  //       : prevState[name],
  //   }));
  // };
  const handleCheckboxChangeModoJS = (event) => {
    const { name, checked, value } = event.target;
    
    // Verifica si el nombre es uno de los grupos definidos
    const isGroup = ['cajaCambio', 'tiposVehiculo', 'tiposElectrico', 'maximoKmStr', 'numPlazas'].includes(name);
    
    setQueryParamsState((prevState) => ({
      ...prevState,
      [name]: isGroup ? // Si es un grupo, maneja el estado de manera especial
        checked ? [...prevState[name], value] : prevState[name].filter((item) => item !== value)
        : value, // Si no es un grupo, simplemente asigna el valor
    }));
  };  
  
  // Actualizar la URL al cambiar los parámetros de consulta
  //r-router-dom v5 const history = useHistory(); 
  let navigate = useNavigate()
  useEffect(() => {
    const searchParams = new URLSearchParams();

    // evitar cargar queryparams en vacio por default en la URL
    Object.entries(queryParamsState).forEach(([key, value]) => 
      /*console.log({key, value}) && */ value?.length > 0   
      && searchParams.append(key, value)
    )
      //r-router-dom v5 history.push(`/busquedaVehiculos?${searchParams.toString()}`);
      navigate(`/busquedaVehiculos?${searchParams.toString()}`);
    console.log("aquiii----->>> ", searchParams);
    // nuitari
    // const val = createQueryUrl(queryParamsState);
    // console.log("val:  ", val);
    // history.push(`/busquedaVehiculos?${val.toString()}`);
  }, [queryParamsState]);

  return (
    <div>
      <ul>
        {results?.aggs?.aggregates?.map((aggregate) => {
          const key = Object.keys(aggregate)[0];
          const label = LABELS[key];
          const values = aggregate[key];

          return (
            <li key={label}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">                  
                    <>
                        {label === "Caja de cambio" && <SettingsOutlinedIcon />}
                        {label === "Eléctricos" && <EvStationTwoToneIcon />}
                        {label === "Vehículos" && <DirectionsCarIcon />}
                        {label === "Kilómetros" && <BatteryChargingFullRoundedIcon />}
                        {label === "Nº de Plazas" && <PeopleAltOutlinedIcon />}                        
                        {/* Agregar condiciones adicionales según sea necesario */}
                    </>
                  {/* Nombre del grupo de filtros */}
                  <Typography>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {values.map((item) => (
                      <li key={item.valor}>
                        <FormControlLabel
                          key={item.valor}
                          value={item.valor}
                          name={NAMES[key]}
                          control={<Checkbox />}
                          checked={isChecked(NAMES[key], item.valor)}                          
                        onChange={handleCheckboxChangeModoJS}
                          // onChange={(event) => handleCheckboxChangeModoJS(event, label === 'Eléctricos' ? item.valorHumano : "")} // onChange={handleCheckboxChangeModoJS}
                          //onChange={(event) => handleCheckboxChangeModoJS(event, key === 'tiposElectrico' ? item.valorHumano : undefined, item.valor)}
                          label={
                            <>
                            {/* {console.log({key})} */}
                              {/*  mostrará {item.valor} en todos los casos excepto cuando label sea igual a "tiposElectrico", en cuyo caso mostrará {item.valorHumano}     */}
                                            {/* {label === "Eléctricos" ? item.valorHumano : item.valor} */}
                                        {/* {item.valor} */}                                 
                                            {/* {console.log(item.valor, item)} */}
                              {key === "tiposElectrico" ? item.valorHumano /* valor */ : item.valor}
                              {/* {JSON.stringify(item)} */}
                              <Typography variant="body3" marginLeft={"10px"}>
                                                                      {/* 90px */}
                                {item.numVehiculos && `(${item.numVehiculos})`}
                              </Typography>
                            </>
                          }
                          disabled={item.numVehiculos === 0  /*no deshabilitarlo en tiposElectrico: && NAMES[key] !== "tiposElectrico"*/} //disabled={item.numVehicles === 0}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuFiltroscheckboxDinamicos;

function paramsToObject(search) {

  const entries = new URLSearchParams(search)

  const result = {}

  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      if (value !== "") result[key] = value
  }
  return result
}
function createQueryUrl(params) {
  const url = Object.entries(params).map(([field, data]) => {
      if (!Array.isArray(data)) {
          return `&${field}=${data}`
      }
      return data.map(value => `&${field}=${value}`).join("")
  }).join('')
  return url.substring(1, url.length)
}
