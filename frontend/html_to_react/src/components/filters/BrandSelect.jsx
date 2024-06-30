import { Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material"
import React, { useState } from "react";
import { HandleCheckboxChangeModoJS } from "./helpers/HandleCheckboxChangeModoJS";
import { useLocation } from "react-router-dom";


export const BrandSelect = ({results}) => {
 // Filtrar Marcas:  updateURL parte comun
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
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
   
   marcasVehiculo: queryParams.get('marcasVehiculo')?.split(',') || [],
 });



    {/* Filtrador de Marcas */}
 const ITEM_HEIGHT = 48;
 const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const [brandName, setBrandName] = React.useState([]);

  const handleChangeBrands = (event) => {
    const {
      target: { value },
    } = event;
    setBrandName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("BranNames: ", value);
    //HandleCheckboxChangeModoJS(event, setQueryParamsState)} 
  };
  const marcasVehiculo = results?.aggs?.aggregates?.find(agg => agg.marcasVehiculo)?.marcasVehiculo || [];

  return (
    <>
    <InputLabel id="demo-multiple-checkbox-label">Marcas</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={brandName}
              onChange={(e) => HandleCheckboxChangeModoJS(e, setQueryParamsState)}  //onChange={handleChangeBrands}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >      {/* {names.map((name) => ( */}
                  {marcasVehiculo.map((marca) => (
                      <MenuItem key={marca.valor} value={marca.valor}>
                        <Checkbox checked={brandName.indexOf(marca.valor) > -1} />
                        <ListItemText primary={marca.valor} /*onChange={HandleCheckboxChangeModoJS}*/ /> {marca.numVehiculos}
                      </MenuItem>
                  ))}
              </Select>
    </>
  )
}