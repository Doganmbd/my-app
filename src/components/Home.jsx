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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'; 

import PopUpDetails  from "../components/PopUpDetails";
import ExcelData from "./ExcelData";

function Home() {
  // Geçerli saati state durum
  const [currentTime, setCurrentTime] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Seçili MII Duruş ID'nin izleneceği durum


  const [filter, setFilter] = useState("all");
  // Seçime dayalı olarak verileri filtreleme
    const filteredData = data.filter((row) => {
      if (filter === "small") {
        const [hours, minutes, seconds] = row.duration.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds < 600;
      }
      return true;
    }); 


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

  // Modal açma fonksiyonları
  // const openModal = () => setIsModalOpen(true);
   //const openModalVar = () => setIsModalOpenVar(true);

    // Modal kapama fonksiyonları
    // const closeModal = () => setIsModalOpen(false);
    // const closeModalVar = () => setIsModalOpenVar(false);


    // useEffect(() => {
      // Modal açıldığında body'e scroll'u kapatan sınıfı ekliyoruz
     //  if (isModalOpen || isModalOpenVar) {
     //    document.body.classList.add("modal-open");
     //  } else {
     //    document.body.classList.remove("modal-open");
    //   }
   //  }, [isModalOpen, isModalOpenVar]);

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
        <div>{currentTime}</div> {/* Time display */}
      </div>

      {/* Search alanı */}
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
        <button className="filter-btn2">   Büyük Duruş</button>
        {<DatePickers />}
        {<ExcelData  /> }
      </div>


{/* Radiobuttona basınca verilerin gelmesi */}
    {/*   <table /* className="table" > */}
   {/* 11111     <thead>
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
                  <td>    */}   
                    {/*Ayrıntı Pop-up ını açan buton */}
{/*   2222                <PopUpDetails />
                  </td>
                  <td>
                    <button className="action-btn">{row.explanation}</button>
                  </td>
                </>
              )} */}



              

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



{/* 333            </tr>
          ))}
        </tbody>
      </table> */}



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
    {filteredData.map((row) => (
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
{/*       {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Çalışma Birimi Seç</h2>
            <ul className="modal-list">
              <li>AKR-KP AKRILIK KAPLAMA (10000108)</li>
              <li>CHİPPER DISC-1 (10000143)</li>
              <li>FORMALDEHİT TESİSİ -1 (10000037)</li>
            </ul>
            <button onClick={closeModal}>Kapat</button>
          </div>
        </div>
      )} */}

      {/* Vardiya Modal */}
   {/*    {isModalOpenVar && (
        <div className="modal-overlay" onClick={closeModalVar}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Vardiya Seç</h2>
            <ul className="modal-list">
              <li>08:00 - 16:00</li>
              <li>16:00 - 24:00</li>
              <li>24:00 - 08:00</li>
            </ul>
            <button onClick={closeModalVar}>Kapat</button>
          </div>
        </div>
      )} */}




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
  );
}

export default Home;
