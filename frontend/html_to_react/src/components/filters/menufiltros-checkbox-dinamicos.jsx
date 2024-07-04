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
import SearchIcon from '@mui/icons-material/Search';

const LABELS = {
  cajaCambio: "Caja de cambio",
  tiposElectrico: "Eléctricos",
  tiposVehiculo: "Vehículos",
  maximoDeKms: "Kilómetros",
  maximoNumPlazas: "Nº de Plazas",

  marcasVehiculo: "Marcas de vehiculos",
};

const NAMES = {
  cajaCambio: "cajaCambio",
  tiposElectrico: "tiposElectrico",
  tiposVehiculo: "tiposVehiculo",
  maximoDeKms: "maximoKmStr",
  maximoNumPlazas: "numPlazas",

  marcasVehiculo: "marcasVehiculo",
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

    // aqui debo recibir todos los valores que setee(en 'params') desde el /index, por ej tb marcasVehiculo
    //no usar getAll, get para evitar fallo . Hacer el split(',') solo para los que puedan llegar concatenados
    ciudadesVehiculo: queryParams.get('ciudadesVehiculo') || '',
    fechaHoraIni: queryParams.get('fechaHoraIni') || '',
    fechaHoraFin: queryParams.get('fechaHoraFin') || '',
    tiposVehiculo: queryParams.get('tiposVehiculo')?.split(',') || [],
    tiposElectrico: queryParams.get('tiposElectrico')?.split(',') || [],
    cajaCambio: queryParams.get('cajaCambio') || [],

    maximoKmStr: queryParams.get('maximoKmStr') || [],
    numPlazas: queryParams.get('numPlazas') || [],
    
    ciudadesDevolverVehiculo: queryParams.get('ciudadesDevolverVehiculo') || '',
    marcasVehiculo: queryParams.get('marcasVehiculo')?.split(',') || [],
  });

  const isChecked = (name, value) => {
    return queryParamsState[name].includes(value);
  };

  
  const handleCheckboxChangeModoJS = (event) => {
    const { name, checked, value } = event.target;
    
    // Verifica si el nombre es uno de los grupos definidos
    const isGroup = ['cajaCambio', 'tiposVehiculo', 'tiposElectrico', 'maximoKmStr', 'numPlazas', 'marcasVehiculo'].includes(name);
    
    setQueryParamsState((prevState) => ({
      ...prevState,
      [name]: isGroup ? // Si es un grupo, maneja el estado de manera especial
        checked ? [...prevState[name], value] : Array.isArray(prevState[name])?  prevState[name].filter((item) => item !== value): ""
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
  }, [queryParamsState]);

  //const [contador, setcontador] = useState(0);
  return (
    <div>
      <span className=" w-full mx-auto pb-4 flex justify-center font-medium text-lg">Configure su Vehiculo</span>
      <ul>
        {/* para si aggregates es un array /efast/v1/vehiculos  = dejar en index/busquedavehiculos const response = await axios.get(` http://localhost:8762/elastic-efast/api/efast/v1/vehiculos${query}`); */}
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
                            {label === "Marcas de vehiculos" && <SearchIcon />}
                        {label === "Kilómetros" && <BatteryChargingFullRoundedIcon />}
                            {label === "Nº de Plazas" && <PeopleAltOutlinedIcon />}                        
                        {/* Agregar condiciones adicionales según sea necesario */}
                    </>
                  {/* Nombre del grupo de filtros */}
                  <Typography>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                  {key === "maximoNumPlazas" ? ( <span> asientos (máximo)</span>  ) : ( "" )}
                    {values.map((item) => (                                     
                      <li key={item.valor}>
                           {/* <p>{item.valor}</p> */}
                           {/* {key !== "marcasVehiculo" ?  // para filtros no input checkbox */}
                                {item.numVehiculos !== 0 &&   //no mostrar si tienen valor 0
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
                                            {/* {key === "marcasVehiculo" ? item.valorHumano : item.valor} */}                                      
                                            {/* {JSON.stringify(item)} */}                           
                                            <Typography variant="body3" marginLeft={"10px"}>
                                                                                    {/* 90px */}
                                              {item.numVehiculos && `(${item.numVehiculos})`}
                                            </Typography>
                                          </>
                                        }
                                        disabled={item.numVehiculos === 0 /*|| (NAMES[key] === "marcasVehiculo" && item.numVehiculos === 1 && item.valor=== )*/ /*no deshabilitarlo en tiposElectrico: && NAMES[key] !== "tiposElectrico"*/ } //disabled={item.numVehicles === 0}
                                      />
                                }
                           {/* : "" } */}
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

export function paramsToObject(search) {

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