import { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import '@mui/material/styles';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationTwoToneIcon from "@mui/icons-material/EvStationTwoTone";

// Define tu componente FiltrarVehiculos
const FiltrarVehiculos = ({ ciudadesVehiculo, fechaHoraIni, fechaHoraFin, tiposVehiculo, tiposElectrico, cajaCambio }) => {
  return (
    <div>
      <h1>FiltrarVehiculos</h1>
      <p>Ciudad de Vehículo: {ciudadesVehiculo}</p>
      <p>Fecha y Hora Inicio: {fechaHoraIni}</p>
      <p>Fecha y Hora Fin: {fechaHoraFin}</p>
      <p>Tipos de Vehículo: {tiposVehiculo.join(', ')}</p>
      <p>Tipos de Vehículos Eléctricos: {tiposElectrico.join(', ')}</p>
      <p>Caja de Cambio: {cajaCambio.join(', ')}</p>
    </div>
  );
};

// En tu componente principal, define la ruta con la generación de URL dinámica
const Rutas = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Estado para almacenar los parámetros de la consulta
  const [queryParamsState, setQueryParamsState] = useState({
    ciudadesVehiculo: queryParams.get('ciudadesVehiculo') || '',
    fechaHoraIni: queryParams.get('fechaHoraIni') || '',
    fechaHoraFin: queryParams.get('fechaHoraFin') || '',
    tiposVehiculo: queryParams.getAll('tiposVehiculo') || [],
    tiposElectrico: queryParams.getAll('tiposElectrico') || [],
    cajaCambio: queryParams.getAll('cajaCambio') || [],

    maximoKmStr: queryParams.getAll('maximoKmStr') || [],
    numPlazas: queryParams.getAll('numPlazas') || [],
  });

  // Función para manejar cambios en los inputs y actualizar el estado
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQueryParamsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (event) => {
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
  useEffect(() => {
    const queryParamsString = new URLSearchParams({
      ciudadesVehiculo: queryParamsState.ciudadesVehiculo,
      fechaHoraIni: queryParamsState.fechaHoraIni,
      fechaHoraFin: queryParamsState.fechaHoraFin,
      tiposVehiculo: queryParamsState.tiposVehiculo,
      tiposElectrico: queryParamsState.tiposElectrico,
      cajaCambio: queryParamsState.cajaCambio,

      maximoKmStr: queryParamsState.maximoKmStr,
      numPlazas: queryParamsState.numPlazas,
    }).toString();
    window.history.replaceState(null, null, `/filtrarVehiculos?${queryParamsString}`);
  }, [queryParamsState]);

  return (
    <Route exact path="/filtrarVehiculos">
      <FiltrarVehiculos
        ciudadesVehiculo={queryParamsState.ciudadesVehiculo}
        fechaHoraIni={queryParamsState.fechaHoraIni}
        fechaHoraFin={queryParamsState.fechaHoraFin}
        tiposVehiculo={queryParamsState.tiposVehiculo}
        tiposElectrico={queryParamsState.tiposElectrico}
        cajaCambio={queryParamsState.cajaCambio}
      />

      <input
        type="text"
        name="ciudadesVehiculo"
        value={queryParamsState.ciudadesVehiculo}
        onChange={handleInputChange}
      />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Caja de cambio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            value="Automatico"
            name="cajaCambio"
            control={<Checkbox />}
            onChange={handleCheckboxChange}
            label={
              <>
                Automático
                <Typography variant="body3" marginLeft={"90px"}>
                  (1)
                </Typography>
              </>
            }
          />
          <FormControlLabel
            value="Manual"
            name="cajaCambio"
            control={<Checkbox />}
            onChange={handleCheckboxChange}
            label={
              <>
                Manual
                <Typography variant="body3" marginLeft={"90px"}>
                  (1)
                </Typography>
              </>
            }
          />
        </AccordionDetails>
      </Accordion>

    
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
              <FormControlLabel
                value="BEV"
                name="tiposElectrico"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
                label={
                  <>
                    BEV
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="PHEV"
                name="tiposElectrico"
                control={<Checkbox />}
                // label="Coche"
                onChange={handleCheckboxChange}
                label={
                  <>
                    PHEV
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
                // labelPlacement="end"
              />
              <FormControlLabel
                value="SHEV"
                name="tiposElectrico"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
                label={
                  <>
                    SHEV
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
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
                onChange={handleCheckboxChange}
                label={
                  <>
                    HEV
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="MHEV"
                name="tiposElectrico"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
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
                value="moto"
                name="tiposVehiculo"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
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
                value="coche"
                name="tiposVehiculo"
                control={<Checkbox />}
                // label="Coche"
                onChange={handleCheckboxChange}
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
              <FormControlLabel
                value="Limitado"
                name="maximoKmStr"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
                label={
                  <>
                    Limitado
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="Ilimitado"
                name="maximoKmStr"
                control={<Checkbox />}
                // label="Coche"
                onChange={handleCheckboxChange}
                label={
                  <>
                    Ilimitado
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
              <Typography> Nº de Plazas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                value="5"
                name="numPlazas"
                control={<Checkbox />}
                // Filtro1
                // label="Moto"
                // labelPlacement="end"
                onChange={handleCheckboxChange}
                label={
                  <>
                    mayorigual5
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                value="6"
                name="numPlazas"
                control={<Checkbox />}
                // label="Coche"
                onChange={handleCheckboxChange}
                label={
                  <>
                    mayorigual6
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
                // labelPlacement="end"
              />
              <FormControlLabel
                value="7"
                name="numPlazas"
                control={<Checkbox />}
                // label="Coche"
                onChange={handleCheckboxChange}
                label={
                  <>
                    mayorigual7
                    <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
                      (1)                      
                    </Typography>
                  </>
                }
                // labelPlacement="end"
              />
            </AccordionDetails>
          </Accordion>

      <input
        type="text"
        name="fechaHoraIni"
        value={queryParamsState.fechaHoraIni}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="fechaHoraFin"
        value={queryParamsState.fechaHoraFin}
        onChange={handleInputChange}
      />

      <label>
        <input
          type="checkbox"
          name="tiposVehiculo"
          value="auto"
          checked={queryParamsState.tiposVehiculo.includes('auto')}
          onChange={handleCheckboxChange}
        />
        Autos
      </label>
      <label>
        <input
          type="checkbox"
          name="tiposVehiculo"
          value="camioneta"
          checked={queryParamsState.tiposVehiculo.includes('camioneta')}
          onChange={handleCheckboxChange}
        />
        Camionetas
      </label>

      <label>
        <input
          type="checkbox"
          name="tiposElectrico"
          value="electrico"
          checked={queryParamsState.tiposElectrico.includes('electrico')}
          onChange={handleCheckboxChange}
        />
        Vehículos Eléctricos
      </label>
    </Route>
  );
};

export default Rutas;