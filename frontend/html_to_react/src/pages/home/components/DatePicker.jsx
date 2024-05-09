/* eslint-disable react/prop-types */
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// function DatePicker({selectedRange, handleSelect}) {

//   return (
//     <div className="hidden xl:block">
//       <DateRange
//         minDate={new Date()}
//         ranges={selectedRange}
//         onChange={handleSelect}
//       />
//     </div>
//   );
// }

// export default DatePicker;

//-----------------------------------------
// DayPicker de shadcn   pnpm add react-day-picker
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "./datepicker.css";
import moment from "moment";

export default function MyDatePicker( { setDates }) {
  const [selected, setSelected] = useState();
  //console.log(selected);

  // para Desktop
  const currentDate = new Date();
   const disabledPastDates = { before: currentDate };
  const selectDates = ( event ) => {
    console.log(event)
    setSelected(event);
    if(!event || !event.from || !event.to)  return '';  //evitar error de undefined al hacer click sobre alguna de las fechas
    const {from , to }= event    
    setDates('dateStart', from);
    setDates('dateEnd', to);   
  }

  //formatear la fecha a mostrar en el <p>
  const formattedDateFrom = moment(selected?.from).format('DD-MM-YYYY');
  const formattedDateTo = moment(selected?.to).format('DD-MM-YYYY');
  const currentDateMoment = moment().format('DD-MM-YYYY');

  return (
    <div>
      {" "}
      {/* Evitar mostrar formattedDateTo con fecha actual si aun no ha seleccionado el formattedDateTo */}
      {selected && formattedDateTo != currentDateMoment  &&(
        <div className="flex">
          {" "}
          {/*<p>{selected?.from?.toString()}</p>{" "}  Thu May 30 2024 00:00:00 GMT+0200 (hora de verano de Europa central)*/}
          <p>{formattedDateFrom }</p>{" "}
          <p> al </p>
          {/* <p>{selected?.to?.toString()}</p>{" "} */}
          <p>{formattedDateTo}</p>{" "}         
        </div>
       )}
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={selectDates}
        disabled={disabledPastDates}  //deshabilitar mostras fechas anteriores a currentDate
      />
    </div>
  );
}
