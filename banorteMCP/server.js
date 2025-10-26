// server.js - API REST con Gemini AI para Banorte (CORREGIDO)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// === CONVERSATION MEMORY ===
let conversationHistory = new Map();

function cleanAIResponse(text) {
  if (!text) return "Lo siento, estoy teniendo dificultades técnicas. ¿Podrías repetir tu pregunta?";
  
  let cleaned = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .trim();
    
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }
  
  const words = cleaned.split(' ');
  if (words.length > 250) {
    cleaned = words.slice(0, 250).join(' ') + '...';
  }
  
  return cleaned;
}

// Ruta del archivo JSON
const DATA_FILE = path.join(__dirname, 'datos-usuario.json');

// Categorías y límites
const CATEGORIAS_LIMITES = {
  "Alimentos": 15, "Gasolina": 8, "Restaurantes": 5,
  "Servicios": 10, "Entretenimiento": 5, "Renta": 30,
  "Salud": 5, "Compras": 10,
};

// ============= FUNCIONES DE DATOS =============

async function leerDatos() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    const datosDefault = {
      perfilUsuario: {
        nombre: "Usuario Demo",
        edad: 32,
        ocupacion: "Profesional",
        ingresoMensual: 15000,
        objetivosFinancieros: ["ahorro", "inversion"],
      },
      cuentas: [
        { id: "CTA001", tipo: "Cuenta de Débito", saldo: 25000, moneda: "MXN" },
        { id: "CTA002", tipo: "Cuenta de Ahorro", saldo: 50000, moneda: "MXN" },
      ],
      transacciones: [
        { fecha: "2025-10-20", monto: -500, categoria: "Alimentos", comercio: "Soriana" },
        { fecha: "2025-10-19", monto: -1200, categoria: "Gasolina", comercio: "Pemex" },
        { fecha: "2025-10-18", monto: -350, categoria: "Restaurantes", comercio: "Starbucks" },
        { fecha: "2025-10-17", monto: 15000, categoria: "Salario", comercio: "Empresa XYZ" },
        { fecha: "2025-10-15", monto: -2500, categoria: "Servicios", comercio: "CFE" },
      ],
      tarjetasCredito: [
        {
          id: "TDC001",
          tipo: "Banorte Clásica",
          limiteCredito: 30000,
          saldoActual: 12000,
          fechaCorte: "2025-10-28",
          pagoMinimo: 600,
        },
      ],
    };
    
    await guardarDatos(datosDefault);
    return datosDefault;
  }
}

async function guardarDatos(datos) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(datos, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error guardando datos:', error);
    throw error;
  }
}

function calcularMetricasFinancieras(datos) {
  const totalIngresos = datos.transacciones
    .filter(t => t.monto > 0)
    .reduce((sum, t) => sum + t.monto, 0);
  
  const totalGastos = Math.abs(
    datos.transacciones
      .filter(t => t.monto < 0)
      .reduce((sum, t) => sum + t.monto, 0)
  );

  const gastosPorCategoria = {};
  datos.transacciones.forEach(tx => {
    if (tx.monto < 0) {
      gastosPorCategoria[tx.categoria] = (gastosPorCategoria[tx.categoria] || 0) + Math.abs(tx.monto);
    }
  });

  const saldoTotal = datos.cuentas.reduce((sum, c) => sum + c.saldo, 0);
  const tarjeta = datos.tarjetasCredito[0];
  const utilizacionCredito = ((tarjeta.saldoActual / tarjeta.limiteCredito) * 100).toFixed(2);

  return {
    totalIngresos,
    totalGastos,
    saldoNeto: totalIngresos - totalGastos,
    gastosPorCategoria,
    saldoTotal,
    utilizacionCredito,
    tarjeta,
  };
}

const createEnhancedPrompt = (datos, metricas, mensaje) => {
  return `Eres un asistente financiero de Banorte. Eres profesional y empático.

PERFIL DEL CLIENTE:
- Nombre: ${datos.perfilUsuario.nombre}
- Edad: ${datos.perfilUsuario.edad} años
- Objetivos: ${datos.perfilUsuario.objetivosFinancieros.join(', ')}

SITUACIÓN FINANCIERA:
- Ingresos: $${metricas.totalIngresos.toLocaleString('es-MX')} MXN
- Gastos: $${metricas.totalGastos.toLocaleString('es-MX')} MXN
- Ahorro: $${metricas.saldoNeto.toLocaleString('es-MX')} MXN
- Saldo total: $${metricas.saldoTotal.toLocaleString('es-MX')} MXN

PREGUNTA: "${mensaje}"

Responde de forma clara y concisa (máximo 200 palabras).`;
};

// ============= ENDPOINTS =============

// GET /api/datos
app.get('/api/datos', async (req, res) => {
  try {
    const datos = await leerDatos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer datos' });
  }
});

// POST /api/datos
app.post('/api/datos', async (req, res) => {
  try {
    await guardarDatos(req.body);
    res.json({ success: true, mensaje: 'Datos actualizados' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

// POST /api/transacciones
app.post('/api/transacciones', async (req, res) => {
  try {
    const datos = await leerDatos();
    const nuevaTransaccion = {
      fecha: req.body.fecha || new Date().toISOString().split('T')[0],
      monto: parseFloat(req.body.monto),
      categoria: req.body.categoria,
      comercio: req.body.comercio || 'No especificado',
    };
    
    datos.transacciones.unshift(nuevaTransaccion);
    await guardarDatos(datos);
    res.json({ success: true, transaccion: nuevaTransaccion });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar transacción' });
  }
});

// ============= GEMINI AI =============

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { mensaje, userId = 'default' } = req.body;
    
    if (!mensaje) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);
    
    if (!conversationHistory.has(userId)) {
      conversationHistory.set(userId, []);
    }
    
    const prompt = createEnhancedPrompt(datos, metricas, mensaje);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let respuestaGemini = response.text();
    respuestaGemini = cleanAIResponse(respuestaGemini);
    
    const history = conversationHistory.get(userId);
    history.push({
      user: mensaje,
      assistant: respuestaGemini,
      timestamp: new Date().toISOString()
    });

    res.json({
      respuesta: respuestaGemini,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error en Gemini:', error);
    res.json({
      respuesta: "Estoy teniendo dificultades técnicas. ¿Podrías reformular tu pregunta?",
      error: true,
    });
  }
});

// POST /api/analisis-inteligente
app.post('/api/analisis-inteligente', async (req, res) => {
  try {
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);

    const prompt = `Analiza esta situación financiera:
- Ingresos: $${metricas.totalIngresos}
- Gastos: $${metricas.totalGastos}
- Saldo: $${metricas.saldoTotal}

Da 3 recomendaciones breves.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analisis = cleanAIResponse(response.text());

    res.json({
      analisis: {
        saludFinanciera: { nivel: 'Buena' },
        fortalezas: ['Ahorro positivo'],
        areasDeOportunidad: ['Reducir gastos'],
        recomendacionesPrioritarias: [
          { titulo: 'Optimizar gastos', descripcion: analisis }
        ]
      },
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al generar análisis' });
  }
});

// GET /api/saldos
app.get('/api/saldos', async (req, res) => {
  try {
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);
    
    res.json({
      cuentas: datos.cuentas,
      tarjetasCredito: datos.tarjetasCredito,
      resumen: {
        saldoTotal: metricas.saldoTotal,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener saldos' });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Financiera Banorte con Gemini AI',
    version: '2.0.0',
    endpoints: {
      'GET  /api/datos': 'Obtener datos',
      'POST /api/datos': 'Actualizar datos',
      'POST /api/transacciones': 'Agregar transacción',
      'POST /api/chat': 'Chat con IA',
      'POST /api/analisis-inteligente': 'Análisis con IA',
      'GET  /api/saldos': 'Obtener saldos',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI integrado`);
  console.log(`💾 Datos en: ${DATA_FILE}`);
});