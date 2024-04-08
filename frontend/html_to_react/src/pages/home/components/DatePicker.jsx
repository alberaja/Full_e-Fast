/* eslint-disable react/prop-types */
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DatePicker({selectedRange, handleSelect}) {
  

  return (
    <div className="hidden xl:block">
      <DateRange
        minDate={new Date()}
        ranges={selectedRange}
        onChange={handleSelect}
      />
    </div>
  );
}

export default DatePicker;
