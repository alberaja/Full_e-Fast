
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useModal } from '../../hooks/modal.jsx';

import SearchResultsCarsEFast from '../../components/body/search-results-final.jsx';


//  modificar los Query String de las URLs
// import { useSearchParams } from "react-router-dom";

//deserializar el objeto del prop a un string, yaq por default es 1 objeto
export default function CarsResultados({params /*,callback*/, resultados, numDiasRangoEntreFechas}) {
 

  return (
    <>

    <div>
           
      {/* ok   <SearchResultsCars  results={results} /> */}
      <SearchResultsCarsEFast  results={ resultados /*results*/ /*params   results*/} numDiasRangoEntreFechas={numDiasRangoEntreFechas} />
    </div>

    </>
  );

}
