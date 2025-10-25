// server.js - API REST con Gemini AI para Banorte (con lectura/escritura JSON)
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

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'TU_API_KEY_AQUI');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Ruta del archivo JSON con datos del usuario
const DATA_FILE = path.join(__dirname, 'datos-usuario.json');

// Categorías y límites recomendados
const CATEGORIAS_LIMITES = {
  "Alimentos": 15, "Gasolina": 8, "Restaurantes": 5,
  "Servicios": 10, "Entretenimiento": 5, "Renta": 30,
  "Salud": 5, "Compras": 10,
};

// ============= FUNCIONES DE MANEJO DE DATOS =============

// Leer datos del JSON
async function leerDatos() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, crear uno con datos por defecto
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
        { fecha: "2025-10-14", monto: -800, categoria: "Entretenimiento", comercio: "Cinépolis" },
        { fecha: "2025-10-12", monto: -4500, categoria: "Renta", comercio: "Inmobiliaria" },
        { fecha: "2025-10-10", monto: -600, categoria: "Alimentos", comercio: "HEB" },
        { fecha: "2025-10-08", monto: -1500, categoria: "Salud", comercio: "Farmacia Guadalajara" },
        { fecha: "2025-10-05", monto: -3000, categoria: "Compras", comercio: "Liverpool" },
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

// Guardar datos en el JSON
async function guardarDatos(datos) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(datos, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error guardando datos:', error);
    throw error;
  }
}

// Función helper para calcular métricas financieras
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

// ============= ENDPOINTS DE GESTIÓN DE DATOS =============

// GET /api/datos - Obtener todos los datos del usuario
app.get('/api/datos', async (req, res) => {
  try {
    const datos = await leerDatos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer datos', detalle: error.message });
  }
});

// POST /api/datos - Reemplazar todos los datos (cuidado, sobrescribe todo)
app.post('/api/datos', async (req, res) => {
  try {
    const nuevosDatos = req.body;
    await guardarDatos(nuevosDatos);
    res.json({ 
      success: true, 
      mensaje: 'Datos actualizados correctamente',
      datos: nuevosDatos 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar datos', detalle: error.message });
  }
});

// PUT /api/perfil - Actualizar perfil del usuario
app.put('/api/perfil', async (req, res) => {
  try {
    const datos = await leerDatos();
    datos.perfilUsuario = { ...datos.perfilUsuario, ...req.body };
    await guardarDatos(datos);
    res.json({ 
      success: true, 
      mensaje: 'Perfil actualizado',
      perfil: datos.perfilUsuario 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil', detalle: error.message });
  }
});

// POST /api/transacciones - Agregar nueva transacción
app.post('/api/transacciones', async (req, res) => {
  try {
    const datos = await leerDatos();
    const nuevaTransaccion = {
      fecha: req.body.fecha || new Date().toISOString().split('T')[0],
      monto: parseFloat(req.body.monto),
      categoria: req.body.categoria,
      comercio: req.body.comercio || 'No especificado',
    };
    
    datos.transacciones.unshift(nuevaTransaccion); // Agrega al inicio
    
    // Actualizar saldo de cuenta si es necesario
    if (req.body.actualizarSaldo) {
      const cuenta = datos.cuentas.find(c => c.id === (req.body.cuentaId || 'CTA001'));
      if (cuenta) {
        cuenta.saldo += nuevaTransaccion.monto;
      }
    }
    
    await guardarDatos(datos);
    res.json({ 
      success: true, 
      mensaje: 'Transacción agregada',
      transaccion: nuevaTransaccion 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar transacción', detalle: error.message });
  }
});

// DELETE /api/transacciones/:indice - Eliminar transacción
app.delete('/api/transacciones/:indice', async (req, res) => {
  try {
    const datos = await leerDatos();
    const indice = parseInt(req.params.indice);
    
    if (indice >= 0 && indice < datos.transacciones.length) {
      const eliminada = datos.transacciones.splice(indice, 1)[0];
      await guardarDatos(datos);
      res.json({ 
        success: true, 
        mensaje: 'Transacción eliminada',
        transaccion: eliminada 
      });
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar transacción', detalle: error.message });
  }
});

// PUT /api/cuentas/:id - Actualizar saldo de cuenta
app.put('/api/cuentas/:id', async (req, res) => {
  try {
    const datos = await leerDatos();
    const cuenta = datos.cuentas.find(c => c.id === req.params.id);
    
    if (cuenta) {
      cuenta.saldo = parseFloat(req.body.saldo);
      await guardarDatos(datos);
      res.json({ 
        success: true, 
        mensaje: 'Saldo actualizado',
        cuenta 
      });
    } else {
      res.status(404).json({ error: 'Cuenta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cuenta', detalle: error.message });
  }
});

// PUT /api/tarjetas/:id - Actualizar tarjeta de crédito
app.put('/api/tarjetas/:id', async (req, res) => {
  try {
    const datos = await leerDatos();
    const tarjeta = datos.tarjetasCredito.find(t => t.id === req.params.id);
    
    if (tarjeta) {
      Object.assign(tarjeta, req.body);
      await guardarDatos(datos);
      res.json({ 
        success: true, 
        mensaje: 'Tarjeta actualizada',
        tarjeta 
      });
    } else {
      res.status(404).json({ error: 'Tarjeta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarjeta', detalle: error.message });
  }
});

// POST /api/importar - Importar datos desde JSON (para cargar archivo del usuario)
app.post('/api/importar', async (req, res) => {
  try {
    const datosImportados = req.body;
    
    // Validar estructura básica
    if (!datosImportados.cuentas || !datosImportados.transacciones) {
      return res.status(400).json({ 
        error: 'Estructura de datos inválida',
        detalle: 'Se requieren al menos "cuentas" y "transacciones"'
      });
    }
    
    await guardarDatos(datosImportados);
    res.json({ 
      success: true, 
      mensaje: 'Datos importados correctamente',
      resumen: {
        cuentas: datosImportados.cuentas.length,
        transacciones: datosImportados.transacciones.length,
        tarjetas: datosImportados.tarjetasCredito?.length || 0,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al importar datos', detalle: error.message });
  }
});

// GET /api/exportar - Exportar todos los datos
app.get('/api/exportar', async (req, res) => {
  try {
    const datos = await leerDatos();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=datos-banorte.json');
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al exportar datos', detalle: error.message });
  }
});

// ============= ENDPOINTS CON GEMINI AI =============

// POST /api/chat - Chat con asistente financiero
app.post('/api/chat', async (req, res) => {
  try {
    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);

    const promptSistema = `Eres un asistente financiero experto de Banorte México. 

DATOS FINANCIEROS DEL USUARIO:
- Nombre: ${datos.perfilUsuario.nombre}
- Ingreso mensual: $${metricas.totalIngresos.toLocaleString('es-MX')} MXN
- Gastos mensuales: $${metricas.totalGastos.toLocaleString('es-MX')} MXN
- Saldo total en cuentas: $${metricas.saldoTotal.toLocaleString('es-MX')} MXN
- Saldo neto mensual: $${metricas.saldoNeto.toLocaleString('es-MX')} MXN
- Utilización de crédito: ${metricas.utilizacionCredito}%
- Deuda tarjeta: $${metricas.tarjeta.saldoActual.toLocaleString('es-MX')} MXN

GASTOS POR CATEGORÍA:
${Object.entries(metricas.gastosPorCategoria)
  .map(([cat, monto]) => `- ${cat}: $${monto.toLocaleString('es-MX')} MXN`)
  .join('\n')}

INSTRUCCIONES:
1. Responde en español de México
2. Sé conciso (máximo 250 palabras)
3. Usa datos reales del usuario
4. Da recomendaciones accionables
5. Tono amigable pero profesional

PREGUNTA: ${mensaje}`;

    const result = await model.generateContent(promptSistema);
    const response = await result.response;
    const respuestaGemini = response.text();

    res.json({
      respuesta: respuestaGemini,
      metricas: {
        saldoTotal: metricas.saldoTotal,
        utilizacionCredito: metricas.utilizacionCredito,
        saldoNeto: metricas.saldoNeto,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error en Gemini:', error);
    res.status(500).json({ error: 'Error al procesar solicitud' });
  }
});

// POST /api/analisis-inteligente - Análisis con IA
app.post('/api/analisis-inteligente', async (req, res) => {
  try {
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);

    const prompt = `Analiza esta situación financiera y responde en JSON:

DATOS:
- Ingresos: $${metricas.totalIngresos.toLocaleString('es-MX')}
- Gastos: $${metricas.totalGastos.toLocaleString('es-MX')}
- Saldo: $${metricas.saldoTotal.toLocaleString('es-MX')}
- Utilización crédito: ${metricas.utilizacionCredito}%

Gastos por categoría:
${Object.entries(metricas.gastosPorCategoria)
  .map(([cat, monto]) => `${cat}: $${monto.toLocaleString('es-MX')}`)
  .join('\n')}

Responde en JSON:
{
  "saludFinanciera": {
    "puntuacion": 0-100,
    "nivel": "Excelente/Buena/Regular/Necesita mejora",
    "descripcion": "descripción breve"
  },
  "fortalezas": ["fortaleza1", "fortaleza2"],
  "areasDeOportunidad": ["area1", "area2"],
  "recomendacionesPrioritarias": [
    {
      "titulo": "título",
      "descripcion": "descripción",
      "impacto": "alto/medio/bajo"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analisisTexto = response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let analisis;
    try {
      analisis = JSON.parse(analisisTexto);
    } catch (e) {
      analisis = { respuestaCompleta: analisisTexto };
    }

    res.json({
      analisis,
      datosBase: metricas,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al generar análisis' });
  }
});

// POST /api/recomendaciones-ia - Recomendaciones con IA
app.post('/api/recomendaciones-ia', async (req, res) => {
  try {
    const { objetivo, presupuesto, plazo } = req.body;
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);

    const prompt = `Genera 3-5 recomendaciones financieras específicas.

SITUACIÓN:
- Objetivo: ${objetivo || 'general'}
- Ingreso: $${metricas.totalIngresos.toLocaleString('es-MX')}/mes
- Ahorro: $${metricas.saldoNeto.toLocaleString('es-MX')}/mes
- Deuda: $${metricas.tarjeta.saldoActual.toLocaleString('es-MX')}

Responde en JSON:
{
  "recomendaciones": [
    {
      "titulo": "título",
      "descripcion": "explicación",
      "pasos": ["paso1", "paso2"],
      "impactoFinanciero": "monto estimado",
      "plazoImplementacion": "inmediato/1 mes/3 meses"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let texto = response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let recomendaciones;
    try {
      recomendaciones = JSON.parse(texto);
    } catch (e) {
      recomendaciones = { textoCompleto: texto };
    }

    res.json({
      ...recomendaciones,
      objetivo,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al generar recomendaciones' });
  }
});

// ============= ENDPOINTS TRADICIONALES =============

// GET /api/saldos
app.get('/api/saldos', async (req, res) => {
  try {
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);
    
    res.json({
      cuentas: datos.cuentas,
      tarjetasCredito: datos.tarjetasCredito.map(t => ({
        ...t,
        creditoDisponible: t.limiteCredito - t.saldoActual,
        utilizacion: `${metricas.utilizacionCredito}%`,
      })),
      resumen: {
        saldoTotal: metricas.saldoTotal,
        creditoDisponible: metricas.tarjeta.limiteCredito - metricas.tarjeta.saldoActual,
        patrimonio: metricas.saldoTotal - metricas.tarjeta.saldoActual,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener saldos' });
  }
});

// GET /api/transacciones
app.get('/api/transacciones', async (req, res) => {
  try {
    const datos = await leerDatos();
    res.json(datos.transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

// POST /api/analisis/transacciones
app.post('/api/analisis/transacciones', async (req, res) => {
  try {
    const datos = await leerDatos();
    const metricas = calcularMetricasFinancieras(datos);

    const categoriasOrdenadas = Object.entries(metricas.gastosPorCategoria)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, monto]) => ({
        categoria: cat,
        monto: monto,
        porcentaje: ((monto / metricas.totalGastos) * 100).toFixed(2),
        limiteRecomendado: CATEGORIAS_LIMITES[cat] || 10,
      }));

    res.json({
      periodo: req.body.periodo || 'mes',
      resumen: {
        totalIngresos: metricas.totalIngresos,
        totalGastos: metricas.totalGastos,
        saldoNeto: metricas.saldoNeto,
        numeroTransacciones: datos.transacciones.length,
      },
      gastosPorCategoria: categoriasOrdenadas,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al analizar transacciones' });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Financiera Banorte con Gemini AI + Persistencia JSON',
    version: '2.1.0',
    endpoints: {
      'Gestión de Datos': [
        'GET  /api/datos - Obtener todos los datos',
        'POST /api/datos - Actualizar todos los datos',
        'PUT  /api/perfil - Actualizar perfil',
        'POST /api/transacciones - Agregar transacción',
        'DELETE /api/transacciones/:indice - Eliminar transacción',
        'PUT  /api/cuentas/:id - Actualizar saldo cuenta',
        'PUT  /api/tarjetas/:id - Actualizar tarjeta',
        'POST /api/importar - Importar JSON',
        'GET  /api/exportar - Exportar JSON',
      ],
      'Con IA (Gemini)': [
        'POST /api/chat - Chat con asistente',
        'POST /api/analisis-inteligente - Análisis con IA',
        'POST /api/recomendaciones-ia - Recomendaciones IA',
      ],
      'Tradicionales': [
        'GET  /api/saldos',
        'GET  /api/transacciones',
        'POST /api/analisis/transacciones',
      ],
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI integrado`);
  console.log(`💾 Datos persistentes en: ${DATA_FILE}`);
  console.log(`📊 API lista para el hackathon`);
});