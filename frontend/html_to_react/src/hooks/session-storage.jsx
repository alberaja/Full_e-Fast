import { useEffect, useState } from 'react';

// SessionStorage: al cerrar el navegador se borran estas variables
const getSessionStorage = (key, defaultValue, custom) => {
    const item = sessionStorage.getItem(key);
    if(item){
        return custom ? custom(item) : JSON.parse(item);
    }
    return defaultValue;
}


const useSessionStorage = (key, defaultValue, {
    handleSet,
    handleGet
}) => {
    const [value, setValue] = useState(() => getSessionStorage(key, defaultValue, handleGet));
  
    useEffect(() => {
        console.log(value)
      sessionStorage.setItem(key, handleSet ? handleSet(value) : value);
    }, [value]);
  
    return [value, setValue]
} 

export default useSessionStorage;
