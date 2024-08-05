// src/ExportExcel.js
import { FileDown } from "lucide-react";
import React from "react";
import * as XLSX from "xlsx";

// Helper function to access nested properties
const getNestedValue = (obj, path) => {
  return path.reduce(
    (value, key) => (value && value[key] !== undefined ? value[key] : ""),
    obj
  );
};

const ExportExcel = ({ columns, data, namaFile }) => {
  const handleExport = () => {
    // Map the data to a format suitable for json_to_sheet
    const sheetData = data.map((row) => {
      let rowData = {};
      columns.forEach((col) => {
        const accessor = col.accessor;
        if (typeof accessor === "function") {
          rowData[col.Header] = accessor(row);
        } else {
          const keys = accessor.split(".");
          rowData[col.Header] = getNestedValue(row, keys);
        }
      });
      return rowData;
    });

    // Create a new worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    // Calculate column widths
    const columnWidths = columns.map((col) => {
      const headerText = col.Header;
      const maxLength = Math.max(
        headerText.length,
        ...sheetData.map((row) => String(row[col.Header] || "").length)
      );
      return { wch: maxLength + 2 }; // Adding some extra padding
    });

    worksheet["!cols"] = columnWidths;

    // Apply header styles
    const headerCellStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // White font color
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "0000FF" } }, // Blue background
    };

    columns.forEach((col, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!worksheet[cellAddress].s) {
        worksheet[cellAddress].s = {};
      }
      worksheet[cellAddress].s = headerCellStyle;
    });

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save the workbook
    XLSX.writeFile(workbook, `${namaFile}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      aria-label="export to exel"
      title="export ke exel"
    >
      <FileDown
        width={20}
        height={20}
        absoluteStrokeWidth={true}
        strokeWidth={1}
      />
    </button>
  );
};

export default ExportExcel;
