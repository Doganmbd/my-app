import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function DatePickers({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    console.log("Start Date:", start);
    console.log("End Date:", end);
    onDateChange(start, end); // Tarih değişiminde tabloyu filtreleyecek fonksiyonu çağırıyoruz
  };

  return (
    
    <div className="date-range-picker">
      <label>Tarih </label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
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
