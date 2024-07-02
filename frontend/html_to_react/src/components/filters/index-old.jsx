import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, RadioGroup } from "@mui/material";
//r-router-dom v5 import { useParams , useLocation, useHistory} from 'react-router-dom';
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled, useTheme } from "@mui/material/styles";

import { useRadioGroup } from "@mui/material/RadioGroup";

// iconos
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationTwoToneIcon from "@mui/icons-material/EvStationTwoTone";


import React, { useState , useEffect} from "react";


const MenuFiltros = ({childrenFiltros, checkedLists, handleChange1, params2, updateSearchParams, results})=> {
  const [todosFiltros2, setTodosFiltros2] = useState([])
    
  const params = useParams()
  // const handleCheckboxChangeAndModifyUrl = (event) => {
  //   const { name, value, checked } = event.target;

  //   // Modifica los parámetros según el estado del checkbox
  //   const newParams = new URLSearchParams(params);

  //   if (checked) {
  //     newParams.append(name, value);
  //   } else {
  //     newParams.delete(name);
  //   }

  //   // Llama a la función para actualizar los parámetros de búsqueda
  //   updateSearchParams(`?${newParams.toString()}`);
  //   console.log({updateSearchParams});
  // };

 //radio de MUI
 const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
  ))(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  }));

 
  //radio de MUI
  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();
    
    
    
    let checkedRadio = false;

    if (radioGroup) {
      checkedRadio = radioGroup.value === props.value;
    }
    
    // console.log({checkedLists, radioGroup, props});
    return <StyledFormControlLabel checked={checkedRadio} {...props} />;
  }
  
  // const [todosFiltros, setTodosFiltros] = useState([]);
  const [todosFiltros, setTodosFiltros] = useState([]);
  //('cajaCambio=&tiposElectrico=&tiposVehiculo=&maximoKmStr=&numPlazas=&ciudadesVehiculo=Madrid&fechaHoraIni=05-03-2024T07%3A00&fechaHoraFin=08-03-2024T18%3A00');
    // cajaCambio: "",
    // tiposElectrico: "",
    // tiposVehiculo: "",
    // maximoKmStr: "",
    // numPlazas: "",
  

  const [filters, setFilters] = useState({   
    // description: "",
    name: "",
    // country: "",
    // inicilaizar
    cajaCambio: "", //carType
    tiposElectrico: "",
    tiposVehiculo: "",
    maximoKmStr: "", //maximoKm
    numPlazas: "",
    // uc03+uc02.  Los valores required=true
    //segun esta inicializacion se precargan 1s valores u otros
    ciudadesVehiculo: "Madrid",
    fechaHoraIni: "05-03-2024T07:00",
    fechaHoraFin: "08-03-2024T18:00",
  });
  
  
  // const handleCheckboxChange = (event) => {
  //   const { name, value, checked } = event.target;
  //   setFilters((prevFilters) => {
  //     let updatedValue;
  //     console.log("name: " + name);
  //     console.log("prevFilters:" + JSON.stringify(prevFilters));

  //     // Si el checkbox se marca, agrega su valor a la cadena de filtro
  //     if (checked) {
  //       updatedValue = prevFilters[name]
  //         ? `${prevFilters[name]},${value}`
  //         : value;
  //       console.log("value: " + value);
  //       console.log("updatedValue: " + updatedValue);
  //     } else {
  //       // Si el checkbox se desmarca, elimina su valor de la cadena de filtro
  //       const values = prevFilters[name]
  //         .split(",")
  //         .filter((val) => val !== value);
  //       updatedValue = values.join(",");
  //     }

  //     // Guardar el valor de [name]=el name del input checkbox + updatedValue=el valor del input checkbox en la variable todosFiltros

  //   const todosFiltros = `${name}=${updatedValue}`;
  //   setTodosFiltros2(`${name}=${updatedValue}`)
  //   // setTodosFiltros((prevTodosFiltros) => {
  //     //   const regex = new RegExp(`${name}=[^&]*`);
  //     //   return prevTodosFiltros.replace(regex, filtros);
  //     // });
      
      
  //     const selectedCheckboxesCount = updatedValue.split(",").length;
  //     if (selectedCheckboxesCount === 1) {
  //       console.log("Solo hay un checkbox seleccionado");
  //     } else if (selectedCheckboxesCount > 1) {
  //       console.log("Hay más de un checkbox seleccionado");
  //     }
      
  //     return {
  //       ...prevFilters,   //... para arrays grandes
  //       [name]: updatedValue,
  //       console: console.log({name, updatedValue, filters}),
  //       // console: console.log("concatenados: "+ [name] + "="+ updatedValue),
  //       todosFiltros: todosFiltros, //[name] + updatedValue,
  //       console: console.log({todosFiltros}),     
  //       console: console.log({ todosFiltros2})
      
        
  //       // todosFiltros   : "tiposVehiculo=moto,coche"   
  //       // todosFiltros   :  "cajaCambio=automatico"
  //       // todas:  tiposVehiculo=moto,coche&cajaCambio=automatico
  //       //name: es la key de cada grupo de input checkboxs.  filters es el String definitivo a ejecutar
  //     };
  //   });

    
    
  //   // Modifica los parámetros según el estado del checkbox
  //   const newParams = new URLSearchParams(params);
    
  //   if (checked) {
  //     newParams.append(name, value);
  //   } else {
  //     newParams.delete(name);
  //   }
    
  //   // Llama a la función para actualizar los parámetros de búsqueda
  //   updateSearchParams(`?${newParams.toString()}`);
  //   console.log({updateSearchParams});
  // }
  
  console.log(JSON.stringify(params))
  // con handleCheckboxChangeModoJS()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  

  // Estado para almacenar los parámetros de la consulta
  const [queryParamsState, setQueryParamsState] = useState(
  {    
    ciudadesVehiculo: queryParams.get('ciudadesVehiculo') || '',
    fechaHoraIni: queryParams.get('fechaHoraIni') || '',
    fechaHoraFin: queryParams.get('fechaHoraFin') || '',
    tiposVehiculo: [],
    tiposElectrico: [],
    cajaCambio: [],
    maximoKmStr: [],
    numPlazas: [],
    ...Object.fromEntries(Array.from(queryParams.entries(), ([key, value]) => [key, value.split(",")]))
  }
  );
  // Función para manejar cambios en los checkboxes
  const handleCheckboxChangeModoJS = (event) => {
    const { name, checked, value } = event.target;
    setQueryParamsState((prevState) => ({
      ...prevState,
      [name]: name === 'cajaCambio'  || 'tiposVehiculo' || 'tiposElectrico' || 'maximoKmStr' || 'numPlazas'  //añadir tantos como nombres de grupos de cada accordeon tenga
        ? checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value)
        : prevState[name],
    }));
  };
  // Actualizar la URL al cambiar los parámetros de consulta
  //const history = useHistory(); 
  let navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams();

    // evitar cargar queryparams en vacio por default en la URL
    Object.entries(queryParamsState).forEach(([key, value]) => 
      value.length > 0 
      && searchParams.append(key, value)
    )

    // const queryParamsString = new URLSearchParams({
    //   // ciudadesVehiculo: queryParamsState.ciudadesVehiculo,
    //   // fechaHoraIni: queryParamsState.fechaHoraIni,
    //   // fechaHoraFin: queryParamsState.fechaHoraFin,
    //   tiposVehiculo: queryParamsState.tiposVehiculo,
    //   tiposElectrico: queryParamsState.tiposElectrico,
    //   cajaCambio: queryParamsState.cajaCambio,

    //   maximoKmStr: queryParamsState.maximoKmStr,
    //   numPlazas: queryParamsState.numPlazas,
    // }).toString();
    //window.history.replaceState(null, null, `/busquedaVehiculos?${queryParamsString}`);
    //r-router-dom v5 history.push(`/busquedaVehiculos?${searchParams.toString()}`);
    navigate(`/busquedaVehiculos?${searchParams.toString()}`);
  }, [queryParamsState]);
 
  const isChecked = (name, value) => {
    return queryParamsState[name].includes(value)
  }

  return (
    <div>        
        
          <Accordion /*style={{ background: "green" }}*/>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Caja de cambio</Typography> {/*Header*/}
            </AccordionSummary>
            <AccordionDetails>
              {/* <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography> */}
              {/* <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                label="Filtro 1"
              /> */}

              {/* ok radio buttons: 
               <RadioGroup name="use-radio-group" /*defaultValue="first">
                <MyFormControlLabel
                  //  first
                  value="automatico"
                  name="cajaCambio"
                  // label="First"
                  // label="Automatico"
                  onChange={handleCheckboxChange}
                  label={
                    <>
                      Automatico
                      <Typography variant="body3" /*component="span" /*color="textSecondary" marginLeft={"75px"}>
                        (1)                      
                      </Typography>
                    </>
                  }
                  control={<Radio />}
                />
                <MyFormControlLabel
                // second
                  value="manual"
                  name="cajaCambio"
                // label="Second"  
                  // label="Manual"
                  onChange={handleCheckboxChange}
                  label={
                    <>
                      Manual
                      <Typography variant="body3" /*component="span" /*color="textSecondary" marginLeft={"105px"}>
                        (1)                      
                      </Typography>
                    </>
                  }
                  control={<Radio />}
                />
              </RadioGroup> */}
              <FormControlLabel
                value="Automatico"
                name="cajaCambio"
                checked={isChecked("cajaCambio", "Automatico")}
                control={<Checkbox />}
                // Filtro1
                // label="automatico"
                // labelPlacement="end"
                // onChange={handleCheckboxChangeModoJS}  //handleCheckboxChange
                label={
                  <>
                    Automático
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="Manual"
                name="cajaCambio"
                checked={isChecked("cajaCambio", "Manual")}
                control={<Checkbox />}
                // label="manual"
                onChange={handleCheckboxChangeModoJS}
                label={
                  <>
                    Manual
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
                // labelPlacement="end"
              />
            </AccordionDetails>
          </Accordion>

          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <EvStationTwoToneIcon />
                {/* Fuel types: */}
                <Typography> Eléctricos</Typography>                
              </AccordionSummary>
              <AccordionDetails>
                {/* <br /> */}
                {/* incluye 1 primero que chequea todos de vez, pero al seleccionar por ej el 3ero y 1ero, tb selecciona todos...-->Los dejo en individuales
                <FormControlLabel
                  label="Parent"
                  control={
                    <Checkbox
                      checked={checkedLists[0] && checkedLists[1]}
                      indeterminate={checkedLists[0] !== checkedLists[1]}
                      onChange={handleChange1}
                    />
                  }
                />
                {childrenFiltros} */}
                <div>
                        <FormControlLabel
                        value="BEV"
                        name="tiposElectrico"
                        checked={isChecked("tiposElectrico", "BEV")}
                        control={<Checkbox />}
                        // Filtro1
                        // label="Moto"
                        // labelPlacement="end"
                        onChange={handleCheckboxChangeModoJS}
                        label={
                          <>
                            BEV
                            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                              {/* (1)     */}
                               {/* {console.log(JSON.stringify(results.aggs.aggregates.transmissionTypes.numVehicles))} */}
                                    {/* {console.log({results})} */}
                                {/* {console.log(results?.aggs?.aggregates?.[1]?.tiposElectrico.[0]?.numVehiculos)} */}
                                {/* ( {results.aggs.aggregates[0].transmissionTypes[0].numVehicles} ) */}
                                {/* {results?.aggs?.aggregates?.[1]?.fuelTypes?.[0]?.numVehicles && ( */}
                                  {results?.aggs?.aggregates?.[1]?.tiposElectrico?.[0]?.numVehiculos && (
                                  <div>
                                    {"("} {results.aggs.aggregates[1].tiposElectrico[0].numVehiculos}  {")"}
                                  </div>
                                )}
                                {/* {console.log("valor para BEV: ", results.aggs.aggregates[1].fuelTypes[0].numVehicles )} */}
                            </Typography>
                          </>
                        }
                      />
                      <FormControlLabel
                        value="PHEV"
                        name="tiposElectrico"
                        control={<Checkbox />}
                        // label="Coche"
                        checked={isChecked("tiposElectrico", "PHEV")}
                        onChange={handleCheckboxChangeModoJS}
                        label={
                          <>
                            PHEV
                            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                              {/* (1)                       */}
                              {results?.aggs?.aggregates?.[1]?.tiposElectrico?.[1]?.numVehiculos && (
                                  <div>
                                    {"("} {results.aggs.aggregates[1].tiposElectrico[1].numVehiculos}  {")"}
                                  </div>
                                )}
                            </Typography>
                          </>
                        }
                        // labelPlacement="end"
                      />
              </div>
              <div>
                    <FormControlLabel
                      value="SHEV"
                      name="tiposElectrico"
                      control={<Checkbox />}
                      // Filtro1
                      // label="Moto"
                      // labelPlacement="end"
                      checked={isChecked("tiposElectrico", "SHEV")}
                      onChange={handleCheckboxChangeModoJS}
                      label={
                        <>
                          SHEV
                          <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                            {/* (1)                       */}
                            {results?.aggs?.aggregates?.[1]?.tiposElectrico?.[2]?.numVehiculos && (
                                  <div>
                                    {"("} {results.aggs.aggregates[1].tiposElectrico[2].numVehiculos}  {")"}
                                  </div>
                                )}
                          </Typography>
                        </>
                      }
                    />
                    <FormControlLabel
                      value="HEV"
                      name="tiposElectrico"
                      control={<Checkbox />}
                      // Filtro1
                      // label="Moto"
                      // labelPlacement="end"
                      checked={isChecked("tiposElectrico", "HEV")}
                      onChange={handleCheckboxChangeModoJS}
                      label={
                        <>
                          HEV
                          <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                            (1)                      
                          </Typography>
                        </>
                      }
                    />
              </div>
              <FormControlLabel
                value="MHEV"
                name="tiposElectrico"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                checked={isChecked("tiposElectrico", "MHEV")}
                onChange={handleCheckboxChangeModoJS}
                label={
                  <>
                    MHEV
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              </AccordionDetails>
            </Accordion>
          </div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <DirectionsCarIcon />
              <Typography> Vehículos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                value="Moto"
                name="tiposVehiculo"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                checked={isChecked("tiposVehiculo", "Moto")}
                onChange={handleCheckboxChangeModoJS}
                label={
                  <>
                    Moto
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="Coche"
                name="tiposVehiculo"
                control={<Checkbox />}
                checked={isChecked("tiposVehiculo", "Coche")}
                // label="Coche"
                onChange={handleCheckboxChangeModoJS}
                label={
                  <>
                    Coche
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
                // labelPlacement="end"
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <DirectionsCarIcon />
              <Typography> Kilómetros</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <RadioGroup name="use-radio-group" /*defaultValue="first"*/>
                <MyFormControlLabel
                  //  first
                  value="Limitado"
                  // label="Limitado"
                  onChange={handleCheckboxChangeModoJS}   /* handleCheckboxChange */
                  label={
                    <>
                      Limitado
                      <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                        (1)                      
                      </Typography>
                    </>
                  }
                  control={<Radio />}
                />
                <MyFormControlLabel
                // second
                  value="Ilimitado"
                  // label="Ilimitado"
                  onChange={handleCheckboxChangeModoJS}
                  labeld={
                    <>
                      Ilimitado
                      <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                        (0)                      
                      </Typography>
                    </>
                  }
                  control={<Radio />}
                />
                <MyFormControlLabel
                // second
                  value="limitado,ilimitado"
                  label="Ambos"
                  onChange={handleCheckboxChangeModoJS}   /* handleCheckboxChange */
                  control={<Radio />}
                />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <DirectionsCarIcon />
              <Typography> Nº de Plazas</Typography>
            </AccordionSummary>
            <AccordionDetails>
               {/* //TODO:  https://mui.com/material-ui/react-slider/       */}
            </AccordionDetails>
          </Accordion>
        </div>

    )

}

export default MenuFiltros;


