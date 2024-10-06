import React, { useState, useEffect } from "react";
import "../App.css";
import { data } from "../helpers/data";
import NotificationForm from "../components/NotificationForm";
import EditPopup from "../components/EditPopup";
import DatePickers from "./DatePickers";

import PopUpDetails  from "../components/PopUpDetails";
import ExcelData from "./ExcelData";

function Home() {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null); // State to track selected MII Duruş ID


  const [filter, setFilter] = useState("all");
  // Filter data based on selection
    const filteredData = data.filter((row) => {
      if (filter === "small") {
        const [hours, minutes, seconds] = row.duration.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds < 600;
      }
      return true;
    }); 



  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalOpenVar, setIsModalOpenVar] = useState(false); // Modal state

  // Function to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Function to handle modal opening
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal closing
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle modal closing
  const closeModalVar = () => {
    setIsModalOpenVar(false);
  };

  // Function to handle modal opening
  const openModalVar = () => {
    setIsModalOpenVar(true);
  };

  // Function to handle radio button selection
  const handleSelection = (id) => {
    setSelectedId(id);
  };
 





  return (
    <div className="app-container">
      <header className="header">
        <h1>Durus Ekranı</h1>
        {/*      <div className="time-display">{currentTime}</div> {/* zaman ekleme */}
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

      {/* Duruşlar radiobutonları */}

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

      <div className="time-display">
        <button className="filter-btn2">Küçük Duruş</button>
        <button className="filter-btn2">Büyük Duruş</button>
        {<DatePickers />}
        {<ExcelData />}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Seç</th> {/* Adding a column for radio button */}
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

{/*         <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="radio"
                  name="selection"
                  /* checked={selectedId === row.id} */
                 /*  onChange={() => handleSelection(row.id)} 
                />
              </td>
              <>
              <td>{row.id}</td>
              <td>{row.workingUnit}</td>
                  <td>{row.startTime}</td>
                  <td>{row.endTime}</td>
                  <td>{row.duration}</td>
                  <td>{row.orderNo}</td>
                  <td>{row.type}</td>
                  <td>{row.reasonCode}</td>
                  <td>{row.responsible}</td>
                  <td>      
                    {/*Ayrıntı Pop-up ını açan buton }
                  <PopUpDetails />
                  </td>
                  <td>
                    <button className="action-btn">{row.explanation}</button>
                  </td>
                  </> */}


{/*               {selectedId === row.id && ( // Only display full row details if this row is selected
                <>
                  <td>{row.workingUnit}</td>
                  <td>{row.startTime}</td>
                  <td>{row.endTime}</td>
                  <td>{row.duration}</td>
                  <td>{row.orderNo}</td>
                  <td>{row.type}</td>
                  <td>{row.reasonCode}</td>
                  <td>{row.responsible}</td>
                  <td>{row.details}</td>
                  <td>
                    <button className="action-btn">{row.explanation}</button>
                  </td>
                </>
              )} */}
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
          <button className="footer-btn">{<NotificationForm />}</button>
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

export default Home;
