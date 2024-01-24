// import BlogList from "./BlogList";
// import useFetch from "./useFetch";

// DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
// import './App.css'
import Home from './Home.jsx'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function PreHome() {

  return (
    <main>
      <div id="datepickerId">

        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Home />
        </LocalizationProvider>
      </div>
    </main>
  )
}

export default PreHome;
