import React, { useState, useEffect, useMemo, useCallback } from 'react';

const FinancialChart = () => {
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState('empresa');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [datos, setDatos] = useState({
    empresa: { transacciones: [] },
    usuarios: { transacciones: [] }
  });

  // Use useCallback to prevent unnecessary re-renders
  const setModoEmpresa = useCallback(() => setModo('empresa'), []);
  const setModoUsuario = useCallback(() => setModo('usuario'), []);

  useEffect(() => {
    const generateSampleData = () => {
      const months = [
        '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
        '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'
      ];
      
      const empresaTransacciones = [];
      const usuarioTransacciones = [];

      // Generate data for each month
      months.forEach(month => {
        const [year, monthNum] = month.split('-');
        
        // Company data (larger amounts)
        const companyIncomeCount = Math.floor(Math.random() * 8) + 5;
        const companyExpenseCount = Math.floor(Math.random() * 15) + 10;
        
        for (let i = 0; i < companyIncomeCount; i++) {
          empresaTransacciones.push({
            fecha: new Date(parseInt(year), parseInt(monthNum) - 1, Math.floor(Math.random() * 28) + 1).getTime(),
            tipo: 'ingreso',
            monto: Math.random() * 15000 + 5000,
            categoria: ['ventas', 'servicios', 'inversiones'][i % 3]
          });
        }
        
        for (let i = 0; i < companyExpenseCount; i++) {
          empresaTransacciones.push({
            fecha: new Date(parseInt(year), parseInt(monthNum) - 1, Math.floor(Math.random() * 28) + 1).getTime(),
            tipo: 'gasto',
            monto: Math.random() * 8000 + 2000,
            categoria: ['nómina', 'operación', 'marketing', 'impuestos'][i % 4]
          });
        }

        // User data (smaller amounts)
        const userIncomeCount = Math.floor(Math.random() * 3) + 2;
        const userExpenseCount = Math.floor(Math.random() * 10) + 8;
        
        for (let i = 0; i < userIncomeCount; i++) {
          usuarioTransacciones.push({
            fecha: new Date(parseInt(year), parseInt(monthNum) - 1, Math.floor(Math.random() * 28) + 1).getTime(),
            tipo: 'ingreso',
            monto: Math.random() * 3000 + 2000,
            categoria: ['salario', 'freelance', 'inversiones'][i % 3]
          });
        }
        
        for (let i = 0; i < userExpenseCount; i++) {
          usuarioTransacciones.push({
            fecha: new Date(parseInt(year), parseInt(monthNum) - 1, Math.floor(Math.random() * 28) + 1).getTime(),
            tipo: 'gasto',
            monto: Math.random() * 800 + 200,
            categoria: ['vivienda', 'comida', 'transporte', 'entretenimiento', 'salud'][i % 5]
          });
        }
      });

      return {
        empresa: { transacciones: empresaTransacciones },
        usuarios: { transacciones: usuarioTransacciones }
      };
    };

    const timer = setTimeout(() => {
      setDatos(generateSampleData());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Process data by month
  const datosPorMes = useMemo(() => {
    const transacciones = modo === 'empresa' 
      ? datos.empresa?.transacciones || []
      : datos.usuarios?.transacciones || [];

    const monthlyData = {};

    transacciones.forEach(transaccion => {
      const fecha = new Date(transaccion.fecha);
      const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      const mesLabel = fecha.toLocaleDateString('es-ES', { 
        year: 'numeric',
        month: 'long'
      });

      if (!monthlyData[mesKey]) {
        monthlyData[mesKey] = {
          key: mesKey,
          label: mesLabel,
          ingresos: 0,
          gastos: 0,
          transacciones: 0,
          balance: 0,
          fecha: fecha
        };
      }

      if (transaccion.tipo === 'ingreso') {
        monthlyData[mesKey].ingresos += transaccion.monto;
      } else {
        monthlyData[mesKey].gastos += transaccion.monto;
      }
      
      monthlyData[mesKey].transacciones++;
      monthlyData[mesKey].balance = monthlyData[mesKey].ingresos - monthlyData[mesKey].gastos;
    });

    // Convert to array and sort by date
    return Object.values(monthlyData)
      .sort((a, b) => a.fecha - b.fecha);
  }, [modo, datos]);

  // Get available months for filter
  const mesesDisponibles = useMemo(() => {
    const months = datosPorMes.map(mes => ({
      value: mes.key,
      label: mes.label
    }));
    return [{ value: 'all', label: 'Todos los meses' }, ...months];
  }, [datosPorMes]);

  // Filter data based on selected month
  const datosFiltrados = useMemo(() => {
    if (selectedMonth === 'all') {
      return datosPorMes;
    }
    return datosPorMes.filter(mes => mes.key === selectedMonth);
  }, [datosPorMes, selectedMonth]);

  // Calculate overall metrics
  const metricas = useMemo(() => {
    const dataToUse = selectedMonth === 'all' ? datosPorMes : datosFiltrados;
    
    const totals = dataToUse.reduce((acc, mes) => {
      acc.ingresos += mes.ingresos;
      acc.gastos += mes.gastos;
      acc.transacciones += mes.transacciones;
      return acc;
    }, { ingresos: 0, gastos: 0, transacciones: 0 });

    const rentabilidad = totals.ingresos > 0 
      ? ((totals.ingresos - totals.gastos) / totals.ingresos * 100) 
      : 0;

    return {
      ...totals,
      rentabilidad,
      balance: totals.ingresos - totals.gastos,
      mesesCount: dataToUse.length
    };
  }, [datosPorMes, datosFiltrados, selectedMonth]);

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
        Generando datos mensuales...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            color: 'white',
            fontSize: '2.5em',
            marginBottom: '10px'
          }}>
            📊 Análisis Mensual
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1em'
          }}>
            Comparativa de Ingresos vs Gastos por Mes
          </p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Mode Selector */}
          <div style={{ textAlign: 'center' }}>
            <label style={{ color: 'white', marginBottom: '8px', display: 'block' }}>
              Tipo de Datos:
            </label>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={setModoEmpresa}
                style={{
                  padding: '10px 20px',
                  backgroundColor: modo === 'empresa' ? '#3498db' : 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
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
                  fontWeight: 'bold'
                }}
              >
                👤 Personal
              </button>
            </div>
          </div>

          {/* Month Filter */}
          <div style={{ textAlign: 'center' }}>
            <label style={{ color: 'white', marginBottom: '8px', display: 'block' }}>
              Filtro por Mes:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '6px',
                border: 'none',
                minWidth: '200px',
                fontSize: '14px'
              }}
            >
              {mesesDisponibles.map(mes => (
                <option key={mes.value} value={mes.value}>
                  {mes.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Metrics */}
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
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '8px' }}>Ingresos Totales</div>
            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
              ${(metricas.ingresos / 1000).toFixed(1)}K
            </div>
            <div style={{ fontSize: '0.8em', opacity: 0.9 }}>
              {selectedMonth === 'all' ? `${metricas.mesesCount} meses` : '1 mes'}
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '8px' }}>Gastos Totales</div>
            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
              ${(metricas.gastos / 1000).toFixed(1)}K
            </div>
            <div style={{ fontSize: '0.8em', opacity: 0.9 }}>
              {metricas.transacciones} transacciones
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9em', marginBottom: '8px' }}>
              {modo === 'empresa' ? 'Rentabilidad' : 'Ahorro'}
            </div>
            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
              {modo === 'empresa' 
                ? `${metricas.rentabilidad.toFixed(1)}%`
                : `$${(metricas.balance / 1000).toFixed(1)}K`
              }
            </div>
            <div style={{ fontSize: '0.8em', opacity: 0.9 }}>
              Balance
            </div>
          </div>
        </div>

        {/* Monthly Comparison Table */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          marginBottom: '25px'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            color: '#2c3e50', 
            marginBottom: '20px'
          }}>
            📈 Comparativa Mensual - {modo === 'empresa' ? 'Empresa' : 'Personal'}
          </h3>
          
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            borderRadius: '8px'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: '#34495e',
                  color: 'white'
                }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Mes</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Ingresos</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Gastos</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Balance</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Transacciones</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((mes, index) => (
                  <tr 
                    key={mes.key}
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white'
                    }}
                  >
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>
                      {mes.label}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right', 
                      color: '#27ae60',
                      fontWeight: 'bold'
                    }}>
                      ${mes.ingresos.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right', 
                      color: '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      ${mes.gastos.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right', 
                      color: mes.balance >= 0 ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      ${mes.balance.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'center'
                    }}>
                      {mes.transacciones}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialChart;