// server.js - API REST con Gemini AI para Banorte (ACTUALIZADO con tus JSON)
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'TU_API_KEY_AQUI');
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp'
});
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
    
    datos.transacciones.unshift(nuevaTransaccion);
    
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
    console.error('❌ Error al agregar transacción:', error);
    res.status(500).json({ 
      error: 'Error al agregar transacción', 
      detalle: error.message 
    });
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

// ============= ENDPOINTS CON GEMINI AI =============

app.post('/api/chat', async (req, res) => {
  try {
    console.log('📨 Petición recibida en /api/chat');
    console.log('Body:', req.body);
    
    const { mensaje } = req.body;
    
    if (!mensaje) {
      console.log('⚠️ Mensaje vacío');
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    console.log('📖 Leyendo datos...');
    const datos = await leerDatos();
    console.log('✅ Datos leídos');
    
    console.log('📊 Calculando métricas...');
    const metricas = calcularMetricasFinancieras(datos);
    console.log('✅ Métricas calculadas');

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

    console.log('🤖 Llamando a Gemini...');
    console.log('🔑 API Key existe:', !!process.env.GEMINI_API_KEY);
    
    const result = await model.generateContent(promptSistema);
    console.log('✅ Respuesta de Gemini recibida');
    
    const response = await result.response;
    const respuestaGemini = response.text();
    console.log('✅ Texto extraído');

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
    console.error('❌ ERROR CRÍTICO EN /api/chat:', error);
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Evitar que el servidor crashee
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Error al procesar solicitud con Gemini',
        detalle: error.message,
        tipo: error.name
      });
    }
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
('/api/simular-whatif-personal', async (req, res) => {
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
      .maapp.postp(([categoria, monto], index) => ({
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
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // NO cerrar el servidor, solo loggear
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection:', reason);
  console.error('Promise:', promise);
  // NO cerrar el servidor, solo loggear
});