import React from "react";
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'; 

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExcelData() {
  // Basit örnek yazdım
  const dataTime = [
    { id: 1, name: "Sample 1", value: "Value 1" },
    { id: 2, name: "Sample 2", value: "Value 2" },
  ];

  // Excel i export ettim
  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(dataTime);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "export.xlsx");
  };

  return (
    <div className="time-displays">
      {/* Excel Export Buttonu */}
      <div className="export-button">
        <button onClick={handleExcelExport}><FontAwesomeIcon icon={faFileExcel} /> Excel</button>
      </div>
    </div>
  );
}

export default ExcelData;
