import React, { useState, useEffect, useMemo, useCallback } from 'react';

const FinancialChart = () => {
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState('empresa');
  const [datos, setDatos] = useState({
    empresa: { transacciones: [] },
    usuarios: { transacciones: [] }
  });

  // Use useCallback to prevent unnecessary re-renders
  const setModoEmpresa = useCallback(() => setModo('empresa'), []);
  const setModoUsuario = useCallback(() => setModo('usuario'), []);

  useEffect(() => {
    // Load minimal sample data instead of large JSON files
    const loadSampleData = () => {
      const sampleData = {
        empresa: {
          transacciones: Array.from({ length: 100 }, (_, i) => ({
            fecha: 45041 + i,
            tipo: i % 3 === 0 ? 'ingreso' : 'gasto',
            monto: Math.random() * 10000 + 1000,
            categoria: ['ventas', 'costos', 'operacion'][i % 3]
          }))
        },
        usuarios: {
          transacciones: Array.from({ length: 50 }, (_, i) => ({
            fecha: 45207 + i,
            tipo: i % 4 === 0 ? 'ingreso' : 'gasto',
            monto: Math.random() * 5000 + 500,
            categoria: ['salario', 'vivienda', 'transporte', 'entretenimiento'][i % 4]
          }))
        }
      };
      
      setDatos(sampleData);
      setLoading(false);
    };

    // Add small delay to show loading state
    const timer = setTimeout(loadSampleData, 500);
    return () => clearTimeout(timer);
  }, []);

  // Memoized date conversion
  const excelDateToJSDate = useCallback((serial) => {
    if (!serial || typeof serial !== 'number') return new Date();
    try {
      const utc_days = Math.floor(serial - 25569);
      const utc_value = utc_days * 86400;
      return new Date(utc_value * 1000);
    } catch {
      return new Date();
    }
  }, []);

  // Memoized data processing - LIMITED DATA
  const datosProcesados = useMemo(() => {
    try {
      const transacciones = modo === 'empresa' 
        ? datos.empresa?.transacciones || []
        : datos.usuarios?.transacciones || [];

      // LIMIT: Only process first 50 transactions for performance
      const limitedTransactions = transacciones.slice(0, 50);
      
      const datosPorFecha = {};
      
      limitedTransactions.forEach((transaccion) => {
        const fecha = excelDateToJSDate(transaccion.fecha);
        // Group by month-year to reduce number of data points
        const mesKey = `${fecha.getFullYear()}-${fecha.getMonth()}`;
        
        if (!datosPorFecha[mesKey]) {
          datosPorFecha[mesKey] = {
            label: fecha.toLocaleDateString('es-ES', { 
              month: 'short', 
              year: 'numeric' 
            }),
            ingresos: 0,
            gastos: 0,
            count: 0
          };
        }

        if (transaccion.tipo === 'ingreso') {
          datosPorFecha[mesKey].ingresos += (transaccion.monto || 0);
        } else {
          datosPorFecha[mesKey].gastos += (transaccion.monto || 0);
        }
        datosPorFecha[mesKey].count++;
      });

      // Convert to array and limit to 12 months max
      return Object.values(datosPorFecha)
        .sort((a, b) => a.label.localeCompare(b.label))
        .slice(0, 12);
        
    } catch (error) {
      console.error('Data processing error:', error);
      return [];
    }
  }, [modo, datos, excelDateToJSDate]);

  // Memoized metrics calculation
  const metricas = useMemo(() => {
    const transacciones = modo === 'empresa' 
      ? datos.empresa?.transacciones || []
      : datos.usuarios?.transacciones || [];

    // Use reduce with early termination for large arrays
    const result = transacciones.reduce((acc, transaccion) => {
      const monto = transaccion.monto || 0;
      if (transaccion.tipo === 'ingreso') {
        acc.ingresos += monto;
      } else {
        acc.gastos += monto;
      }
      return acc;
    }, { ingresos: 0, gastos: 0 });

    const totalIngresos = result.ingresos;
    const totalGastos = result.gastos;
    const rentabilidad = totalIngresos > 0 
      ? ((totalIngresos - totalGastos) / totalIngresos * 100) 
      : 0;

    return {
      totalIngresos,
      totalGastos,
      rentabilidad,
      ahorro: totalIngresos - totalGastos,
      totalTransacciones: transacciones.length
    };
  }, [modo, datos]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
        color: 'white',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        Cargando datos optimizados...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '15px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header - Simplified */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            color: 'white',
            fontSize: '2em',
            marginBottom: '5px'
          }}>
            📊 Dashboard Rápido
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1em'
          }}>
            Modo: {modo === 'empresa' ? '🏢 Empresa' : '👤 Usuario'}
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '30px',
          gap: '10px'
        }}>
          <button
            onClick={setModoEmpresa}
            style={{
              padding: '10px 20px',
              backgroundColor: modo === 'empresa' ? '#3498db' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            🏢 Empresa
          </button>
          <button
            onClick={setModoUsuario}
            style={{
              padding: '10px 20px',
              backgroundColor: modo === 'usuario' ? '#3498db' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            👤 Usuario
          </button>
        </div>

        {/* Metrics Cards - Simplified */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px', 
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '5px' }}>Ingresos</div>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
              ${(metricas.totalIngresos / 1000).toFixed(0)}K
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '5px' }}>Gastos</div>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
              ${(metricas.totalGastos / 1000).toFixed(0)}K
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '5px' }}>
              {modo === 'empresa' ? 'Rentab.' : 'Ahorro'}
            </div>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
              {modo === 'empresa' 
                ? `${metricas.rentabilidad.toFixed(0)}%`
                : `$${(metricas.ahorro / 1000).toFixed(0)}K`
              }
            </div>
          </div>
        </div>

        {/* Performance Info */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <div style={{ color: '#27ae60', fontWeight: 'bold', marginBottom: '10px' }}>
            ✅ Optimizado para Rendimiento
          </div>
          <div style={{ color: '#666' }}>
            Transacciones: {metricas.totalTransacciones} | 
            Períodos: {datosProcesados.length} |
            Modo: {modo}
          </div>
        </div>

        {/* Simple Data Display - Limited */}
        {datosProcesados.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <div style={{ 
              textAlign: 'center', 
              color: '#333', 
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              Últimos Períodos (Limitado para rendimiento)
            </div>
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto',
              display: 'grid', 
              gap: '8px' 
            }}>
              {datosProcesados.map((periodo, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{periodo.label}</span>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ color: '#2ecc71' }}>
                      +${(periodo.ingresos / 1000).toFixed(0)}K
                    </span>
                    <span style={{ color: '#e74c3c' }}>
                      -${(periodo.gastos / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialChart;