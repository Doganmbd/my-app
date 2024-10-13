import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { data } from "../helpers/data";
import NotificationForm from "../components/NotificationForm";
import EditPopup from "../components/EditPopup";
import DatePickers from "./DatePickers";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
/* import { motion } from 'framer-motion';  */

import PopUpDetails  from "../components/PopUpDetails";
import ExcelData from "./ExcelData";

function Home() {
  /* Animasyonlu geçiş */

   // Tarih değişiminde tabloyu filtrele

   const [filteredData, setFilteredData] = useState(data); // Filtrelenmiş veriler
   const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Seçilen tarih aralığı 
   
   const handleDateChange = (startDate, endDate) => {
    setSelectedDateRange([startDate, endDate]);
  };

  // Tablonun filtrelenmesi
  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      const filtered = data.filter((row) => {
        const rowDate = new Date(row.startTime);// Satırdaki tarih
        return rowDate >= startDate && rowDate <= endDate;// Aralıkta mı kontrolü
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Tarih seçilmezse tüm verileri göster
    }
  }, [selectedDateRange]);

  const [searchMain, setSearchMain] = useState(""); // Arama terimi

  // Arama fonksiyonu (girdi değiştiğinde otomatik çalışacak)
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchMain(value); // Arama terimini güncelle

    const filtered = data.filter((row) => row.id.toString().includes(value)); // ID'ye göre filtreleme
    setFilteredData(filtered); // Filtrelenmiş verileri güncelle
  };
  // Geçerli saati state durum
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Seçili MII Duruş ID'nin izleneceği durum


  const [filter, setFilter] = useState("all");
  // Seçime dayalı olarak verileri filtreleme
  const filteredRows = filteredData.filter((row) => {
    const [hours, minutes, seconds] = row.duration.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (filter === "small") {
      return totalSeconds < 600; // 10 dakikadan az
    } else if (filter === "large") {
      return totalSeconds >= 600; // 10 dakikadan fazla
    }
    return true; // Diğer durumda tüm verileri göster
  });

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };


/*     const [isModalOpen, setIsModalOpen] = useState(false); // Çalışma Birimi modal state'i
    const [isModalOpenVar, setIsModalOpenVar] = useState(false); // Vardiya modal state'i */

  // Saati her saniye güncelleme işlevi
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    // Bileşenin bağlantısının kesilmesi sırasında temizleme zamanlayıcısı
    return () => clearInterval(timer);
  }, []);

  const [showWorkUnitModal, setShowWorkUnitModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Seçilen tarih
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi


  const handleWorkUnitClose = () => setShowWorkUnitModal(false);
  const handleWorkUnitShow = () => setShowWorkUnitModal(true);
  
  const handleShiftClose = () => setShowShiftModal(false);
  const handleShiftShow = () => setShowShiftModal(true);

    // Çalışma birimleri (örnek veriler)
    const workUnits = [
      "AKR-KP AKRILIK KAPLAMA (10000108)",
      "CHİPPER DISC-1 (10000143)",
      "FORMALDEHİT TESİSİ -1 (10000037)"
    ];
  
    // Arama terimine göre filtreleme
    const filteredWorkUnits = workUnits.filter(unit =>
      unit.toLowerCase().includes(searchTerm.toLowerCase())
    );



  // Radia button seçimini yönetme işlevi
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
{/*       <button onClick={openModal}>Çalışma Birimi</button>
      <button onClick={openModalVar}>Vardiya</button> */}
              <Button variant="secondary" onClick={handleWorkUnitShow}>Çalışma Birimi</Button>
              <Button variant="secondary" onClick={handleShiftShow}>Vardiya</Button>
        <div>{currentTime}</div> {/*Saat gösterimi */}
      </div>

      {/* Search alanı */}
      <div className="search-section">
        <input 
        type="text" 
        placeholder="Arama" 
        className="search-bar"
        value={searchMain}
        onChange={handleSearchInput} // Arama inputu değiştiğinde filtrele
 />
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
        <button onClick={() => handleFilterChange("small")} className="filter-btn2">Küçük Duruş</button>
        <button onClick={() => handleFilterChange("large")} className="filter-btn2">   Büyük Duruş</button>
        { <DatePickers onDateChange={handleDateChange} />}
        {<ExcelData  /> }
      </div>






<table /* className="table" */>
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
    {filteredRows.map((row) => (
      <tr key={row.id} onClick={() => handleSelection(row.id)} style={{ cursor: 'pointer' }}>
        <td>
          <input
            type="radio"
            name="selection"
            checked={selectedId === row.id}
            onChange={() => handleSelection(row.id)}
          />
        </td>
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
          {/* Ayrıntı Pop-up ını açan buton */}
          <PopUpDetails />
        </td>
        <td>
          <button className="action-btn">{row.explanation}</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>








       {/* Çalışma Birimi Modal */}
       <Modal show={showWorkUnitModal} onHide={handleWorkUnitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Çalışma Birimi Seç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Arama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-2"
          />
          <ul className="modal-list">
            {filteredWorkUnits.map((unit, index) => (
              <li key={index}>{unit}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWorkUnitClose}>Kapat</Button>
        </Modal.Footer>
      </Modal>

      {/* Vardiya Modal */}
      <Modal show={showShiftModal} onHide={handleShiftClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vardiya Seç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>

            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>
          <ul className="modal-list">
            <li>08:00 - 16:00</li>
            <li>16:00 - 24:00</li>
            <li>24:00 - 08:00</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShiftClose}>Kapat</Button>
        </Modal.Footer>
      </Modal>

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
   /*  </motion.div> */
  );
}

export default Home;
