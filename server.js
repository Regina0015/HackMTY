import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para leer un JSON
function readJson(fileName) {
  const filePath = path.join(__dirname, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// Convertir array de arrays a array de objetos
function arrayToObjects(arrayData) {
  if (arrayData.length > 0 && typeof arrayData[0] === "object" && !Array.isArray(arrayData[0])) {
    return arrayData;
  }

  const [headers, ...rows] = arrayData;

  if (!Array.isArray(headers)) {
    console.warn("⚠️ Formato inesperado: los encabezados no son un array");
    return [];
  }

  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

// Filtrar y ordenar por tipo
function filterAndSortByType(data, tipoBuscado) {
  return data
    .filter(item => item.tipo && item.tipo.toLowerCase() === tipoBuscado)
    .sort((a, b) => b.monto - a.monto);
}

// Procesar un archivo y guardar dos JSON separados
function processFile(fileName, baseOutputName) {
  const rawData = readJson(fileName);
  const dataObjects = arrayToObjects(rawData);

  console.log(`📂 ${fileName} contiene ${dataObjects.length} registros.`);

  const tipos = ["gasto", "ingreso"];

  tipos.forEach(tipo => {
    const filtered = filterAndSortByType(dataObjects, tipo);

    const outputPath = path.join(__dirname, `${baseOutputName}_${tipo}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 4), "utf-8");

    console.log(`✅ ${baseOutputName}_${tipo}.json creado con éxito. Top 5:`);
    console.log(filtered.slice(0, 5));
  });
}

// Ejecutar para cada archivo
processFile("finanzas_personales.json", "finanzas_personales");
processFile("finanzas_empresa.json", "finanzas_empresa");
