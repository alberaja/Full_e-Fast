// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrarme de instalar axios con: npm install axios

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setQuery(inputValue);

        // Realizar la búsqueda solo si la entrada es lo suficientemente larga
        if (inputValue.length > 2) {
            // Llamar a la función de búsqueda
            onSearch(inputValue);
        }
    };

    return (
        //<div>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={handleInputChange}
            />
        //     <button className="btn btn-success">
        //         <FontAwesomeIcon icon={faSearch} />
        //     </button>
        // </div>
    );
};

export default SearchBar;
