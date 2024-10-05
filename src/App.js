import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null); // State to track selected MII Duruş ID
  const [filter, setFilter] = useState("all"); // State for filter: 'all' or 'small'

  // Function to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Cleanup timer on component unmount
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

  // Filter data based on selection
  const filteredData = data.filter((row) => {
    if (filter === "small") {
      // Convert duration from string to total seconds
      const [hours, minutes, seconds] = row.duration.split(":").map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      return totalSeconds < 600; // less than 10 minutes
    }
    return true;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>Durus Ekranı</h1>
        </header>
      <div  className="time-display">
      <button >Çalışma Birimi</button>
      <button >Vardiya</button>
      <div>{currentTime}</div> {/* Adding time display */}
      </div>

      <div className="search-section">
        <input type="text" placeholder="Arama" className="search-bar" />
      </div>

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
      <div>
        <button className="filter-btn2">Küçük Duruş</button>
        <button className="filter-btn2">Büyük Duruş</button>
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
              {selectedId === row.id && ( // Only display full row details if this row is selected
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
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <footer className="footer">
        {/* Sol taraf: Bildirim ve Toplu Neden Girişi */}
        <div className="footer-left">
          <button className="footer-btn">Bildirim Oluştur</button>
          <button className="footer-btn">Toplu Neden Girişi</button>
        </div>

        {/* Sağ taraf: Diğer butonlar */}
        <div className="footer-right">
          <button className="extra-btn">Ayrıştır</button>
          <button className="extra-btn">Rapor Yukarı</button>
          <button className="extra-btn">Düzenle</button>
          <button className="highlight-btn">Yeni Bildirim</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
