import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (rows, countries, filename) => {
  const sheetData = rows.map((row) => {
    const obj = {
      Category: row.category,
      Segment: row.subcategory,
    };

    countries.forEach((c) => {
      obj[c] = row.values[c] || "";
    });

    return obj;
  });

  const ws = XLSX.utils.json_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Insights");

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, `${filename}.xlsx`);
};
