import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure to style the modal appropriately;
import DatePicker from "react-datepicker";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "react-datepicker/dist/react-datepicker.css";
import PopUpDetails  from "./components/PopUpDetails";
import EditPopup  from "./components/EditPopup";


function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalOpenVar, setIsModalOpenVar] = useState(false); // Modal state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Sample data to export as Excel
  const dataTime = [
    { id: 1, name: "Sample 1", value: "Value 1" },
    { id: 2, name: "Sample 2", value: "Value 2" },
  ];

  // Handle Excel Export
  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(dataTime);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "export.xlsx");
  };

  // Function to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample data for the table
  const [data] = useState([
    {
      id: 601025,
      workingUnit: "PARKE3",
      startTime: "1 Eki 2024 08:04:46",
      endTime: "1 Eki 2024 08:09:49",
      duration: "00:05:03",
      orderNo: "",
      type: "OEE DURUŞU",
      reasonCode: "",
      responsible: "",
      details: "",
      explanation: "BOY KESİM",
    },
    {
      id: 601026,
      workingUnit: "PARKE4",
      startTime: "1 Eki 2024 07:45:30",
      endTime: "1 Eki 2024 08:15:30",
      duration: "00:30:00",
      orderNo: "",
      type: "OEE DURUŞU",
      reasonCode: "",
      responsible: "",
      details: "",
      explanation: "BOY KESİM",
    },
  ]);

  // Function to handle radio button selection
  const handleSelection = (id) => {
    setSelectedId(id);
  };

  // Function to handle modal opening
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal closing
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Function to handle modal opening
  const openModalVar = () => {
    setIsModalOpenVar(true);
  };

  // Function to handle modal closing
  const closeModalVar = () => {
    setIsModalOpenVar(false);
  };

  // Filter data based on selection
  const filteredData = data.filter((row) => {
    if (filter === "small") {
      const [hours, minutes, seconds] = row.duration.split(":").map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      return totalSeconds < 600;
    }
    return true;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>Durus Ekranı</h1>
      </header>

      <div className="time-display">
        <button onClick={openModal}>Çalışma Birimi</button>
        <button onClick={openModalVar}>Vardiya</button>
        <div>{currentTime}</div> {/* Time display */}
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input type="text" placeholder="Arama" className="search-bar" />
      </div>





      {/* Filter Section */}
      <div className="filters">
        <label>
          <input
            type="radio"
            name="filter"
            checked={filter === "small"}
            onChange={() => setFilter("small")}
          />
          Küçük Duruşlar
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          Tüm Hat Duruşları
        </label>
      </div>

      {/* Filter Buttons */}
      <div className="time-display">
        <button className="filter-btn2">Küçük Duruş</button>
        <button className="filter-btn2">Büyük Duruş</button>
              {/* Date Range Picker */}
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
      </div>
            {/* Excel Export Button */}
            <div className="export-button">
        <button onClick={handleExcelExport}>Excel</button>
      </div>

      {/* Optional: Display selected dates */}
      {startDate && endDate && (
        <div>
          <p>
            Selected Dates: {startDate.toLocaleDateString()} -{" "}
            {endDate.toLocaleDateString()}
          </p>
        </div>
      )}
      </div>

      {/* Data Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Seç</th>
            <th>MII Duruş ID</th>
            <th>Çalışma birimi</th>
            <th>Başlangıç zamanı</th>
            <th>Bitiş zamanı</th>
            <th>Süre</th>
            <th>Sipariş No</th>
            <th>Tip</th>
            <th>Neden kodu</th>
            <th>Neden olan</th>
            <th>Ayrıntılar</th>
            <th>Açıklama</th>
          </tr>
        </thead>


        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="radio"
                  name="selection"
                  checked={selectedId === row.id}
                  onChange={() => handleSelection(row.id)}
                />
              </td>
              <td>{row.id}</td>
              {selectedId === row.id && (
                <>
                  <td>{row.workingUnit}</td>
                  <td>{row.startTime}</td>
                  <td>{row.endTime}</td>
                  <td>{row.duration}</td>
                  <td>{row.orderNo}</td>
                  <td>{row.type}</td>
                  <td>{row.reasonCode}</td>
                  <td>{row.responsible}</td>
                  <td>      
                    {/*Ayrıntı Pop-up ını açan buton */}
                  <PopUpDetails />
                  </td>
                  <td>
                    <button className="action-btn">{row.explanation}</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Çalışma Birimi Seç</h2>
            <input type="text" placeholder="Arama" className="search-bar" />
            <ul className="modal-list">
              {/* Replace with real data */}
              <li>AKR-KP AKRILIK KAPLAMA (10000108)</li>
              <li>CHİPPER DISC-1 (10000143)</li>
              <li>FORMALDEHİT TESİSİ -1 (10000037)</li>
            </ul>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {isModalOpenVar && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Vardiya Seç</h2>
            <input type="text" placeholder="Arama" className="search-bar" />
            <ul className="modal-list">
              {/* Replace with real data */}
              <li>08:00 - 16: 00 </li>
              <li>16:00 - 24:00 </li>
              <li>24:00 - 08:00 </li>
            </ul>
            <button onClick={closeModalVar}>Cancel</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <button className="footer-btn">Bildirim Oluştur</button>
          <button className="footer-btn">Toplu Neden Girişi</button>
        </div>
        <div className="footer-right">
          <button className="extra-btn">Ayrıştır</button>
          <button className="extra-btn">Rapor Yukarı</button>
          <button className="extra-btn">{<EditPopup />}</button>
          <button className="highlight-btn">Yeni Bildirim</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
