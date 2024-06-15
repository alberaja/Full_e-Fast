import React, { useEffect } from 'react';

const GetBrands = ({ onDataFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8762/elastic-efast/api/efast/v1/propiedades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();          
          onDataFetch(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataFetch]);

  return null; // Este componente no necesita renderizar nada
};

export default GetBrands;