// server.js - API REST con Gemini AI para Banorte (ACTUALIZADO con tus JSON)
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

// Rutas de archivos JSON
const FINANZAS_PERSONALES = path.join(__dirname, 'data', 'finanzas_personales.json');
const FINANZAS_EMPRESAS = path.join(__dirname, 'data', 'finanzas_empresas.json');

// ============= FUNCIONES DE MANEJO DE DATOS =============

// Leer finanzas personales
async function leerFinanzasPersonales() {
  try {
    const data = await fs.readFile(FINANZAS_PERSONALES, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo finanzas personales:', error);
    return [];
  }
}

// Leer finanzas empresariales
async function leerFinanzasEmpresas() {
  try {
    const data = await fs.readFile(FINANZAS_EMPRESAS, 'utf-8');
    const lineas = JSON.parse(data);
    // Convertir de formato CSV-like a objetos
    const headers = lineas[0];
    return lineas.slice(1).map(row => ({
      empresa_id: row[0],
      fecha: row[1],
      tipo: row[2],
      concepto: row[3],
      categoria: row[4],
      monto: row[5],
    }));
  } catch (error) {
    console.error('Error leyendo finanzas empresariales:', error);
    return [];
  }
}

// Calcular métricas de finanzas personales
function calcularMetricasPersonales(transacciones, idUsuario) {
  const transaccionesUsuario = transacciones.filter(t => t.id_usuario === idUsuario);
  
  const ingresos = transaccionesUsuario.filter(t => t.tipo === 'ingreso');
  const gastos = transaccionesUsuario.filter(t => t.tipo === 'gasto');
  
  const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
  const totalGastos = gastos.reduce((sum, t) => sum + t.monto, 0);
  
  const gastosPorCategoria = {};
  gastos.forEach(t => {
    gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.monto;
  });
  
  return {
    totalIngresos,
    totalGastos,
    balance: totalIngresos - totalGastos,
    gastosPorCategoria,
    numeroTransacciones: transaccionesUsuario.length,
    tasaAhorro: totalIngresos > 0 ? ((totalIngresos - totalGastos) / totalIngresos * 100).toFixed(2) : 0,
  };
}

// Calcular métricas empresariales
function calcularMetricasEmpresa(transacciones, empresaId) {
  const transaccionesEmpresa = transacciones.filter(t => t.empresa_id === empresaId);
  
  const ingresos = transaccionesEmpresa.filter(t => t.tipo === 'ingreso');
  const gastos = transaccionesEmpresa.filter(t => t.tipo === 'gasto');
  
  const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
  const totalGastos = gastos.reduce((sum, t) => sum + t.monto, 0);
  
  const gastosPorCategoria = {};
  gastos.forEach(t => {
    gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.monto;
  });
  
  const margenUtilidad = totalIngresos > 0 ? ((totalIngresos - totalGastos) / totalIngresos * 100).toFixed(2) : 0;
  
  return {
    totalIngresos,
    totalGastos,
    balance: totalIngresos - totalGastos,
    gastosPorCategoria,
    margenUtilidad,
    numeroTransacciones: transaccionesEmpresa.length,
  };
}

// ============= ENDPOINTS PARA FINANZAS PERSONALES =============

// GET /api/finanzas-personales/:id_usuario - Análisis de un usuario
app.get('/api/finanzas-personales/:id_usuario', async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id_usuario);
    const transacciones = await leerFinanzasPersonales();
    const metricas = calcularMetricasPersonales(transacciones, idUsuario);
    
    const transaccionesUsuario = transacciones.filter(t => t.id_usuario === idUsuario);
    
    res.json({
      id_usuario: idUsuario,
      metricas,
      transacciones: transaccionesUsuario,
      alertas: [
        metricas.balance < 0 ? `⚠️ Balance negativo: -$${Math.abs(metricas.balance).toFixed(2)}` : null,
        metricas.tasaAhorro < 10 ? `⚠️ Tasa de ahorro baja: ${metricas.tasaAhorro}%` : null,
      ].filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener finanzas personales', detalle: error.message });
  }
});

// GET /api/finanzas-empresas/:empresa_id - Análisis de una empresa
app.get('/api/finanzas-empresas/:empresa_id', async (req, res) => {
  try {
    const empresaId = req.params.empresa_id;
    const transacciones = await leerFinanzasEmpresas();
    const metricas = calcularMetricasEmpresa(transacciones, empresaId);
    
    const transaccionesEmpresa = transacciones.filter(t => t.empresa_id === empresaId);
    
    res.json({
      empresa_id: empresaId,
      metricas,
      transacciones: transaccionesEmpresa,
      alertas: [
        metricas.balance < 0 ? `⚠️ Balance negativo: -$${Math.abs(metricas.balance).toFixed(2)}` : null,
        metricas.margenUtilidad < 10 ? `⚠️ Margen de utilidad bajo: ${metricas.margenUtilidad}%` : null,
      ].filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener finanzas empresariales', detalle: error.message });
  }
});

// POST /api/agregar-transaccion-personal - Agregar transacción personal
app.post('/api/agregar-transaccion-personal', async (req, res) => {
  try {
    const { id_usuario, categoria, descripcion, monto, tipo } = req.body;
    
    const transacciones = await leerFinanzasPersonales();
    const nuevaTransaccion = {
      id_usuario,
      fecha: Math.floor(Date.now() / 86400000) + 25569, // Convertir a formato Excel
      categoria,
      descripcion,
      monto: parseFloat(monto),
      tipo,
    };
    
    transacciones.push(nuevaTransaccion);
    await fs.writeFile(FINANZAS_PERSONALES, JSON.stringify(transacciones, null, 2), 'utf-8');
    
    res.json({
      success: true,
      mensaje: 'Transacción agregada correctamente',
      transaccion: nuevaTransaccion,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar transacción', detalle: error.message });
  }
});

// POST /api/agregar-transaccion-empresa - Agregar transacción empresarial
app.post('/api/agregar-transaccion-empresa', async (req, res) => {
  try {
    const { empresa_id, tipo, concepto, categoria, monto } = req.body;
    
    const data = await fs.readFile(FINANZAS_EMPRESAS, 'utf-8');
    const lineas = JSON.parse(data);
    
    const nuevaFila = [
      empresa_id,
      new Date().toISOString(),
      tipo,
      concepto,
      categoria,
      parseFloat(monto),
    ];
    
    lineas.push(nuevaFila);
    await fs.writeFile(FINANZAS_EMPRESAS, JSON.stringify(lineas, null, 2), 'utf-8');
    
    res.json({
      success: true,
      mensaje: 'Transacción empresarial agregada',
      transaccion: {
        empresa_id,
        fecha: nuevaFila[1],
        tipo,
        concepto,
        categoria,
        monto: nuevaFila[5],
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar transacción empresarial', detalle: error.message });
  }
});

// ============= ENDPOINTS CON GEMINI AI =============

// POST /api/consultar-asistente-personal - Consulta con IA para finanzas personales
app.post('/api/consultar-asistente-personal', async (req, res) => {
  try {
    const { id_usuario, pregunta } = req.body;
    
    if (!id_usuario || !pregunta) {
      return res.status(400).json({ error: 'Se requiere id_usuario y pregunta' });
    }
    
    const transacciones = await leerFinanzasPersonales();
    const metricas = calcularMetricasPersonales(transacciones, id_usuario);
    
    const prompt = `Eres un asesor financiero personal experto de Banorte México.

SITUACIÓN FINANCIERA DEL USUARIO ${id_usuario}:
- Ingresos totales: $${metricas.totalIngresos.toLocaleString('es-MX')} MXN
- Gastos totales: $${metricas.totalGastos.toLocaleString('es-MX')} MXN
- Balance: $${metricas.balance.toLocaleString('es-MX')} MXN
- Tasa de ahorro: ${metricas.tasaAhorro}%

GASTOS POR CATEGORÍA:
${Object.entries(metricas.gastosPorCategoria)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, monto]) => `- ${cat}: $${monto.toLocaleString('es-MX')} MXN`)
  .join('\n')}

PREGUNTA DEL USUARIO:
${pregunta}

Responde de manera profesional, clara y con recomendaciones accionables basadas en los datos reales. Máximo 300 palabras.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({
      respuesta: response.text(),
      metricas,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error en Gemini:', error);
    res.status(500).json({ error: 'Error al procesar consulta con IA' });
  }
});

// POST /api/consultar-asistente-empresa - Consulta con IA para empresa
app.post('/api/consultar-asistente-empresa', async (req, res) => {
  try {
    const { empresa_id, pregunta } = req.body;
    
    if (!empresa_id || !pregunta) {
      return res.status(400).json({ error: 'Se requiere empresa_id y pregunta' });
    }
    
    const transacciones = await leerFinanzasEmpresas();
    const metricas = calcularMetricasEmpresa(transacciones, empresa_id);
    
    const prompt = `Eres un asesor financiero empresarial experto de Banorte México.

SITUACIÓN FINANCIERA DE LA EMPRESA ${empresa_id}:
- Ingresos totales: $${metricas.totalIngresos.toLocaleString('es-MX')} MXN
- Gastos totales: $${metricas.totalGastos.toLocaleString('es-MX')} MXN
- Balance: $${metricas.balance.toLocaleString('es-MX')} MXN
- Margen de utilidad: ${metricas.margenUtilidad}%

GASTOS POR CATEGORÍA:
${Object.entries(metricas.gastosPorCategoria)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, monto]) => `- ${cat}: $${monto.toLocaleString('es-MX')} MXN`)
  .join('\n')}

CONSULTA:
${pregunta}

Responde con análisis profesional y recomendaciones estratégicas. Máximo 300 palabras.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({
      respuesta: response.text(),
      metricas,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error en Gemini:', error);
    res.status(500).json({ error: 'Error al procesar consulta con IA' });
  }
});

// POST /api/recomendaciones-ia-personal - Recomendaciones con IA
app.post('/api/recomendaciones-ia-personal', async (req, res) => {
  try {
    const { id_usuario } = req.body;
    
    const transacciones = await leerFinanzasPersonales();
    const metricas = calcularMetricasPersonales(transacciones, id_usuario);
    
    const prompt = `Genera 3-5 recomendaciones financieras personalizadas.

DATOS:
- Ingresos: $${metricas.totalIngresos.toLocaleString('es-MX')}
- Gastos: $${metricas.totalGastos.toLocaleString('es-MX')}
- Balance: $${metricas.balance.toLocaleString('es-MX')}
- Tasa ahorro: ${metricas.tasaAhorro}%

Gastos por categoría:
${Object.entries(metricas.gastosPorCategoria)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, monto]) => `${cat}: $${monto.toLocaleString('es-MX')}`)
  .join('\n')}

Responde en JSON:
{
  "recomendaciones": [
    {
      "tipo": "ahorro|alerta|oportunidad",
      "prioridad": "alta|media|baja",
      "titulo": "título breve",
      "descripcion": "explicación detallada",
      "impacto_estimado": monto numérico
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
      metricas,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al generar recomendaciones' });
  }
});

// POST /api/simular-whatif-personal - Simulador What-If
app.post('/api/simular-whatif-personal', async (req, res) => {
  try {
    const { 
      id_usuario, 
      reduccion_gastos_porcentaje = 0,
      aumento_ingresos_porcentaje = 0,
      nuevo_gasto_mensual = 0,
      nuevo_ingreso_mensual = 0,
      meses = 6 
    } = req.body;
    
    const transacciones = await leerFinanzasPersonales();
    const metricas = calcularMetricasPersonales(transacciones, id_usuario);
    
    // Calcular proyección
    let ingresosMensuales = metricas.totalIngresos / 12;
    let gastosMensuales = metricas.totalGastos / 12;
    
    if (reduccion_gastos_porcentaje > 0) {
      gastosMensuales *= (1 - reduccion_gastos_porcentaje / 100);
    }
    if (aumento_ingresos_porcentaje > 0) {
      ingresosMensuales *= (1 + aumento_ingresos_porcentaje / 100);
    }
    gastosMensuales += nuevo_gasto_mensual;
    ingresosMensuales += nuevo_ingreso_mensual;
    
    const balanceMensual = ingresosMensuales - gastosMensuales;
    const balanceProyectado = metricas.balance + (balanceMensual * meses);
    
    // Análisis con Gemini
    const prompt = `Analiza este escenario financiero:

ESCENARIO: ${meses} meses
- Reducción gastos: ${reduccion_gastos_porcentaje}%
- Aumento ingresos: ${aumento_ingresos_porcentaje}%
- Nuevo gasto mensual: $${nuevo_gasto_mensual}
- Nuevo ingreso mensual: $${nuevo_ingreso_mensual}

RESULTADOS:
- Balance actual: $${metricas.balance.toFixed(2)}
- Balance proyectado: $${balanceProyectado.toFixed(2)}
- Diferencia: $${(balanceProyectado - metricas.balance).toFixed(2)}

Responde en JSON:
{
  "riesgos": ["riesgo1", "riesgo2"],
  "oportunidades": ["oportunidad1", "oportunidad2"],
  "analisis": "análisis breve"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let texto = response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let analisisIA = {};
    try {
      analisisIA = JSON.parse(texto);
    } catch (e) {
      analisisIA = { analisis: texto };
    }
    
    res.json({
      escenario: {
        reduccion_gastos_porcentaje,
        aumento_ingresos_porcentaje,
        nuevo_gasto_mensual,
        nuevo_ingreso_mensual,
        meses,
      },
      proyeccion: {
        balance_actual: metricas.balance,
        balance_proyectado: balanceProyectado,
        diferencia: balanceProyectado - metricas.balance,
        flujo_mensual: balanceMensual,
      },
      analisis_ia: analisisIA,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error en simulación What-If' });
  }
});

// GET /api/comparar-categorias/:id_usuario - Comparar gastos por categoría
app.get('/api/comparar-categorias/:id_usuario', async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id_usuario);
    const transacciones = await leerFinanzasPersonales();
    const metricas = calcularMetricasPersonales(transacciones, idUsuario);
    
    const ranking = Object.entries(metricas.gastosPorCategoria)
      .sort((a, b) => b[1] - a[1])
      .map(([categoria, monto], index) => ({
        posicion: index + 1,
        categoria,
        monto,
        porcentaje: ((monto / metricas.totalGastos) * 100).toFixed(2) + '%',
      }));
    
    res.json({
      total_gastos: metricas.totalGastos,
      ranking_categorias: ranking,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al comparar categorías' });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Financiera Banorte con Gemini AI',
    version: '3.0.0',
    descripcion: 'Análisis financiero personal y empresarial con IA',
    endpoints: {
      'Finanzas Personales': [
        'GET  /api/finanzas-personales/:id_usuario - Análisis completo',
        'POST /api/agregar-transaccion-personal - Agregar transacción',
        'POST /api/consultar-asistente-personal - Chat con IA',
        'POST /api/recomendaciones-ia-personal - Recomendaciones IA',
        'POST /api/simular-whatif-personal - Simulador What-If',
        'GET  /api/comparar-categorias/:id_usuario - Ranking categorías',
      ],
      'Finanzas Empresariales': [
        'GET  /api/finanzas-empresas/:empresa_id - Análisis completo',
        'POST /api/agregar-transaccion-empresa - Agregar transacción',
        'POST /api/consultar-asistente-empresa - Chat con IA',
      ],
    },
    ejemplos: {
      usuarios_disponibles: [47, 7, 50],
      empresas_disponibles: ['E016', 'E037'],
    },
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Gemini AI integrado`);
  console.log(` Leyendo datos de:`);
  console.log(`   - ${FINANZAS_PERSONALES}`);
  console.log(`   - ${FINANZAS_EMPRESAS}`);
  console.log(` API lista para el hackathon`);
});