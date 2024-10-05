import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null); // State to track selected MII Duruş ID

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
  ]);

  // Function to handle radio button selection
  const handleSelection = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Durus Ekrani</h1>
        <div className="time-display">{currentTime}</div> {/* Adding time display */}
      </header>

      <div className="search-section">
        <input type="text" placeholder="Arama" className="search-bar" />
      </div>

      <div className="filters">
        <button className="filter-btn">Küçük Duruş</button>
        <button className="filter-btn">Büyük Duruş</button>
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
          {data.map((row) => (
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

      <footer className="footer">
        <button className="footer-btn">Bildirim Oluştur</button>
        <button className="footer-btn">Toplu Neden Girişi</button>
      </footer>
    </div>
  );
}

export default App;
