import React, { useEffect, useState } from 'react'
import ModalLayout from '../modal-layout'
//r-router-dom v5 import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const FilterModal = ({ isOpen, handleClose, onFilter }) => {

  // @cheki: llama a esta funcion en el cambio del onChange
  const handleChange = (evento) => { onFilter(evento.currentTarget.value) };


  const location = useLocation();
  //r-router-dom v5 const history = useHistory();  // historico del navegador
  let navigate = useNavigate()


  // Obtener los parámetros de búsqueda del objeto location
  // URLSearchParams devuelve 1 objeto serializado
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const initialRadioValue = searchParams.get("radioValue") || "";
  const initialValueNumBolsas = searchParams.get("numBolsasValue") || "";
  const initialValueMarcaCoche = searchParams.get("MarcaCoche") || [];   // asegurar de que siempre sea un array para los Input checkbox que puedan seleccionarse varios a la vez

  // Estado local para el campo de búsqueda y los inputs
  const [query, setQuery] = useState(initialQuery);
  const [radioValue, setRadioValue] = useState(initialRadioValue);
  const [numBolsasValue, setNumBolsasValue] = useState(initialValueNumBolsas);
  // opcional: asegurar de que siempre sea un array para los Input checkbox que puedan seleccionarse varios a la vez
  const [marcaCocheValue, setMarcaCocheValue] = useState(
    initialValueMarcaCoche //|| []
  );

  // !! solo se añaden los parámetros de consulta cuando se modifican:   almacenar los valores anteriores de los parámetros de consulta y compararlos antes de actualizar la URL
  // Estado local para almacenar los valores anteriores de los parámetros de consulta
  const [prevQuery, setPrevQuery] = useState(initialQuery);
  const [prevRadioValue, setPrevRadioValue] = useState(initialRadioValue);
  const [prevNumBolsasValue, setPrevNumBolsasValue] = useState(initialValueNumBolsas);
  const [prevMarcaCocheValue, setPrevMarcaCocheValue] = useState(initialValueMarcaCoche);


  // Actualizar la URL cuando cambia la consulta de búsqueda o los inputs
  useEffect(() => {
    const params = new URLSearchParams();
    // params.set("query", query);
    // params.set("radioValue", radioValue);
    // params.set("numBolsasValue", numBolsasValue);
    // params.set("MarcaCocheValue", MarcaCocheValue);


    // ok pero SOLO PARA filtrar de 1 en 1 en el Query param
    // !! solo se añaden los parámetros de consulta cuando se modifican:
    // if (query !== prevQuery) {
    //   params.set("query", query);
    //   setPrevQuery(query);
    // }

    // if (radioValue !== prevRadioValue) {
    //   params.set("radioValue", radioValue);
    //   setPrevRadioValue(radioValue);
    // }

    // if (numBolsasValue !== prevNumBolsasValue) {
    //   params.set("numBolsasValue", numBolsasValue);
    //   setPrevNumBolsasValue(numBolsasValue);
    // }

    // if (MarcaCocheValue !== prevMarcaCocheValue) {
    //   params.set("MarcaCocheValue", MarcaCocheValue);
    //   setPrevMarcaCocheValue(MarcaCocheValue);
    // }

    // if (params.toString() !== "") {
    //   history.push({ search: params.toString() });
    //   handleSearch();
    // }

    // concatenar los parámetros de consulta en lugar de reemplazarlos. Evitar SOLO PARA filtrar de 1 en 1 en el Query param
    // concatenar los valores antiguos y nuevos del parámetro de consulta (MarcaCocheValue,...) utilizando una coma ,
    // la coma ',' se codifica como %2C.   
    // prevMarcaCocheValue es "Toyota" y MarcaCocheValue es "Honda", la URL resultante:  ?MarcaCocheValue=Toyota%2CHonda   ?MarcaCocheValue=volvo%2Cfiat    
    // if (query !== prevQuery) {
    //   params.set("query", `${prevQuery},${query}`);
    //   setPrevQuery(query);
    // }

    // if (radioValue !== prevRadioValue) {
    //   params.set("radioValue", `${prevRadioValue},${radioValue}`);
    //   setPrevRadioValue(radioValue);
    // }

    // if (numBolsasValue !== prevNumBolsasValue) {
    //   params.set("numBolsasValue", `${prevNumBolsasValue},${numBolsasValue}`);
    //   setPrevNumBolsasValue(numBolsasValue);
    // }

    // if (MarcaCocheValue !== prevMarcaCocheValue) {
    //   params.set("MarcaCocheValue", `${prevMarcaCocheValue},${MarcaCocheValue}`);
    //   setPrevMarcaCocheValue(MarcaCocheValue);
    // }

    // if (params.toString() !== "") {
    //   history.push({ search: params.toString() });
    //   handleSearch();
    // }

    // concatenar los query params usando "&" y solo añadir los parámetros de consulta/filtros cuando se modifican
    // Ejs ok:
    // .../busquedaVehiculos?radioValue=opcion2&numBolsasValue=3bolsas&MarcaCocheValue=audi
    // .../busquedaVehiculos?radioValue=opcion3&numBolsasValue=4bolsas&MarcaCocheValue=fiat
    if (query) params.set("query", query);
    if (radioValue) params.set("radioValue", radioValue);
    if (numBolsasValue) params.set("numBolsasValue", numBolsasValue);
    //console.log(marcaCocheValue);
    // if (marcaCocheValue) params.set("MarcaCocheValue", marcaCocheValue);
    // !! solo se añaden los parámetros de consulta cuando se modifican.  marcaCocheValue es un Array[] que puede tener varios valores. 
    if (marcaCocheValue && marcaCocheValue.length > 0) params.set("MarcaCocheValue", marcaCocheValue );       

    // SOLO Para input checkbox
    // Opcional, se añaden desde onChange()
    // Concatenar marcas seleccionadas como una cadena separada por comas
    //if (marcaCocheValue.length > 0) {
    //   //console.log(  marcaCocheValue+ Array.isArray(marcaCocheValue));
    //params.set("MarcaCocheValue", marcaCocheValue.join(','));
    //}

    const queryString = params.toString();

    // Solo actualiza la URL si hay cambios en los parámetros de consulta
    if (queryString !== location.search.slice(1)) {
      const newSearch = queryString ? `?${queryString}` : "";
      const newUrl = `${location.pathname}${newSearch}${location.hash}`;
      //r-router-dom v5   history.push(newUrl);
      navigate(newUrl)
      handleSearch();
    }


    //history.push({ search: params.toString() });
    // aja !!!!!!!!!!!!!!!!!!!!
    //  handleSearch(); // aja: ejecutar la llamada tras los cambios    !!!!!!!!!!!!!!!!!!!!
  }, [query, radioValue, numBolsasValue, marcaCocheValue, /*r-router-dom v5 history*/, navigate]); // ojo!! añadirlo aqui tb para verificar si están seleccionados

  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Realiza la lógica de búsqueda utilizando los valores de 'query' y 'radioValue'
    console.log("Realizando búsqueda con el query:", query);
    console.log("Radio seleccionado:", radioValue);
    console.log("Número de bolsas seleccionado:", numBolsasValue);
    console.log("MarcaCocheValue seleccionado:", marcaCocheValue);
  };


  return (
    <ModalLayout isOpen={isOpen} handleClose={handleClose} >
      {/* Creo el Formulario en https://codesandbox.io/p/sandbox/queryparams-uselocation-usehistory-5tj8xw?file=%2Fsrc%2FSearchPage.js%3A88%2C15 */}
      {/* --->  queryParams2-useLocation,useHistory  https://codesandbox.io/p/sandbox/queryparams2-uselocation-usehistory-zghwfv?file=%2Fsrc%2FSearchPage.js%3A22%2C49 */}
      <input type="radio" name='a' value={1} onChange={handleChange} />a
      <input type="radio" name='a' value={2} onChange={handleChange} />b



      {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <label>
          Buscar:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <button type="submit">Buscar</button>

        <br />

        {/* NÚMERO DE PASAJEROS */}
        <label>
          NÚMERO DE PASAJEROS:
          <span>
            <label>
              2
              <input
                type="radio"
                value="opcion2"
                checked={radioValue === "opcion2"}
                onChange={() => setRadioValue("opcion2")}
              />
            </label>
            <label>
              3
              <input
                type="radio"
                value="opcion3"
                checked={radioValue === "opcion3"}
                onChange={() => setRadioValue("opcion3")}
              />
            </label>
          </span>
        </label>

        <br />

        <label>KM de autonomía</label>
        <br />

        {/* Nº de bolsas */}
        <label>
          <span>
            Nº de bolsas +2
            <label>
              <input
                type="radio"
                value="2bolsas"
                checked={numBolsasValue === "2bolsas"}
                onChange={() => setNumBolsasValue("2bolsas")}
              />
            </label>
            <label>
              +3
              <input
                type="radio"
                value="3bolsas"
                checked={numBolsasValue === "3bolsas"}
                onChange={() => setNumBolsasValue("3bolsas")}
              />
            </label>
            <label>
              +4
              <input
                type="radio"
                value="4bolsas"
                checked={numBolsasValue === "4bolsas"}
                onChange={() => setNumBolsasValue("4bolsas")}
              />
            </label>
          </span>
        </label>

        <br />
        <label>
          {/* https://www.w3schools.com/html/html_form_elements.asp */}
          <label htmlFor="cars">Elije por marca:</label>
          {/* COMBOBOX, 
              Problema" :  solo puedes seleccionar 1, y por default no lo carga la Url hasta q cambies el value seleccionado por default*/}
          {/*  <select
            id="cars"
            name="cars"
            onChange={(e) => setMarcaCocheValue(e.target.value)}
            value={MarcaCocheValue}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
      </select>    */}

          {/* <label>
            Tesla<input
              type="checkbox"
              value="Tesla"
              checked={marcaCocheValue === "Tesla"}
              // onChange={() => setMarcaCocheValue("Tesla")}
              onChange={() => {
                if (!marcaCocheValue.includes("Tesla")) {
                  // Obtener una copia del array actual antes de realizar modificaciones
                  const updatedMarcaCocheValue = [...marcaCocheValue];

                  // Realizar las modificaciones, Por ejemplo, agregar o quitar una marca del array
                  updatedMarcaCocheValue.push("Tesla");

                  // Usar setMarcaCocheValue para actualizar el estado con la nueva copia del array
                  setMarcaCocheValue(updatedMarcaCocheValue);
                }
              }
              }
            />
          </label> */}
          <label>
            Tesla
            <input
              type="checkbox"
              value="Tesla"
              checked={marcaCocheValue.includes("Tesla")}
              onChange={() => {
                // Obtener una copia del array actual antes de realizar modificaciones.  Si "Tesla" ya está presente, lo elimina; de lo contrario, lo agrega.
                // Si marcaCocheValue incluye el valor "Tesla":  se crea un nuevo array que excluye todas las instancias de "Tesla" utilizando el método filter.
                // sino:   crea un nuevo array que es una copia de marcaCocheValue, pero con "Tesla" agregado al final.
                const updatedMarcaCocheValue = marcaCocheValue.includes("Tesla")
                  ? marcaCocheValue.filter((marca) => marca !== "Tesla")
                  : [...marcaCocheValue, "Tesla"];

                // Usar setMarcaCocheValue para actualizar el estado con la nueva copia del array
                setMarcaCocheValue(updatedMarcaCocheValue);
              }}
            />
          </label>

          <label>
            Toyota
            <input
              type="checkbox"
              value="Toyota"
              checked={marcaCocheValue.includes("Toyota")}
              onChange={() => {
                // Obtener una copia del array actual antes de realizar modificaciones
                const updatedMarcaCocheValue = marcaCocheValue.includes("Toyota")
                  ? marcaCocheValue.filter((marca) => marca !== "Toyota")
                  : [...marcaCocheValue, "Toyota"];

                // Usar setMarcaCocheValue para actualizar el estado con la nueva copia del array
                setMarcaCocheValue(updatedMarcaCocheValue);
              }}
            />
          </label>

        </label>        
      </form>

      <button type="submit">Filtrar Búsqueda</button>

    </ModalLayout>
  )
}

export default FilterModal