
export const HandleCheckboxChangeModoJS = (event, setQueryParamsState) => {
  const { name, checked, value } = event.target;
  
  // Verifica si el nombre es uno de los grupos definidos
  const isGroup = ['cajaCambio', 'tiposVehiculo', 'tiposElectrico', 'maximoKmStr', 'numPlazas', 'marcasVehiculo'].includes(name);
  
  setQueryParamsState((prevState) => ({
    ...prevState,
    [name]: isGroup ? // Si es un grupo, maneja el estado de manera especial
      checked ? [...prevState[name], value] : prevState[name].filter((item) => item !== value)
      : value, // Si no es un grupo, simplemente asigna el valor
  }));    
};  