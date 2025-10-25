import ExcelJS from 'exceljs';
import fs from 'fs';

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile("./finanzas_empresa.xlsx");

const worksheet = workbook.worksheets[0];
const rows = [];

worksheet.eachRow((row, rowNumber) => {
  rows.push(row.values.slice(1)); // skip Excel’s first empty cell
});

fs.writeFileSync('finanzas_empresa.json', JSON.stringify(rows, null, 2));
console.log('Excel converted to JSON successfully (streamed)!');
