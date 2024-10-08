import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function DatePickers() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="date-range-picker">
      <label>Tarih :</label>
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="dd.MM.yyyy"
        placeholderText="dd.MM.yyyy - dd.MM.yyyy"
        isClearable
      />
    {/* örnek tarih 
      {startDate && endDate && (
        <div>
          <p>
            Selected Dates: {startDate.toLocaleDateString()} -{" "}
            {endDate.toLocaleDateString()}
          </p>
        </div>
      )} */}
      
    </div>
  );
}

export default DatePickers;
