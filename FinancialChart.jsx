import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const FinancialChart = () => {
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState('empresa');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [datos, setDatos] = useState({
    empresa: { transacciones: [] },
    usuarios: { transacciones: [] }
  });
  
  // Face ID states con MediaPipe
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFaceIdAvailable, setIsFaceIdAvailable] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [detectionStatus, setDetectionStatus] = useState('Preparando cámara...');
  const [faceDetected, setFaceDetected] = useState(false);
  
  // Refs para MediaPipe
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceDetectionRef = useRef(null);
  const cameraRef = useRef(null);

  // Configuración de MediaPipe Face Detection
  useEffect(() => {
    const initializeMediaPipe = async () => {
      try {
        // Cargar MediaPipe dinámicamente
        const { FaceDetection } = await import('@mediapipe/face_detection');
        const { Camera } = await import('@mediapipe/camera_utils');
        
        // Inicializar Face Detection
        faceDetectionRef.current = new FaceDetection({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
          }
        });

        faceDetectionRef.current.setOptions({
          model: 'short',
          minDetectionConfidence: 0.5,
          minSuppressionThreshold: 0.3
        });

        faceDetectionRef.current.onResults(onFaceDetectionResults);

        setIsFaceIdAvailable(true);
        setDetectionStatus('Cámara lista - Acércate a la cámara');
        
      } catch (error) {
        console.error('Error loading MediaPipe:', error);
        setAuthError('No se pudo cargar el sistema de reconocimiento facial');
        setIsFaceIdAvailable(false);
      }
    };

    initializeMediaPipe();
  }, []);

  // Resultados de la detección facial
  const onFaceDetectionResults = useCallback((results) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    
    // Limpiar canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Dibujar video
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height
    );

    // Verificar si se detectó un rostro
    if (results.detections.length > 0) {
      const detection = results.detections[0];
      
      // Dibujar bounding box
      canvasCtx.strokeStyle = '#00FF00';
      canvasCtx.lineWidth = 2;
      const boundingBox = detection.boundingBox;
      canvasCtx.strokeRect(
        boundingBox.xCenter * canvasElement.width - boundingBox.width * canvasElement.width / 2,
        boundingBox.yCenter * canvasElement.height - boundingBox.height * canvasElement.height / 2,
        boundingBox.width * canvasElement.width,
        boundingBox.height * canvasElement.height
      );

      if (!faceDetected) {
        setFaceDetected(true);
        setDetectionStatus('✅ Rostro detectado - Autenticando...');
        
        // Simular proceso de autenticación después de detectar rostro
        setTimeout(() => {
          authenticateUser();
        }, 1500);
      }
    } else {
      if (faceDetected) {
        setFaceDetected(false);
        setDetectionStatus('Rostro perdido - Acércate a la cámara');
      }
    }
    
    canvasCtx.restore();
  }, [faceDetected]);

  // Autenticar usuario después de detección
  const authenticateUser = useCallback(async () => {
    setIsAuthenticating(true);
    
    try {
      // Simular verificación biométrica más avanzada
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 85% de éxito para simulación más realista
          if (Math.random() > 0.15) {
            resolve(true);
          } else {
            reject(new Error('Verificación biométrica falló. Intenta nuevamente.'));
          }
        }, 2000);
      });

      // Detener cámara después de autenticación exitosa
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      
      setIsAuthenticated(true);
      setAuthError('');
      setDetectionStatus('✅ Autenticación exitosa');
    } catch (error) {
      setAuthError(error.message);
      setFaceDetected(false);
      setDetectionStatus('Autenticación fallida - Intenta nuevamente');
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  // Iniciar cámara para Face ID
  const startFaceIdAuthentication = useCallback(async () => {
    if (!faceDetectionRef.current || !videoRef.current) return;

    try {
      setAuthError('');
      setFaceDetected(false);
      setDetectionStatus('Iniciando cámara...');
      
      const { Camera } = await import('@mediapipe/camera_utils');
      
      // Configurar cámara
      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await faceDetectionRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });
      
      await cameraRef.current.start();
      setDetectionStatus('Cámara activa - Acércate a la cámara');
      
    } catch (error) {
      console.error('Error starting camera:', error);
      setAuthError('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Detener cámara si está activa
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    setIsAuthenticated(false);
    setAuthError('');
    setFaceDetected(false);
    setDetectionStatus('Preparando cámara...');
  }, []);

  // Resto de tus funciones existentes (setModoEmpresa, setModoUsuario, etc.)
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

      months.forEach(month => {
        const [year, monthNum] = month.split('-');
        
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

    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setDatos(generateSampleData());
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Resto de tus useMemo functions (datosPorMes, mesesDisponibles, etc.) se mantienen igual
  const datosPorMes = useMemo(() => {
    if (!isAuthenticated) return [];
    
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

    return Object.values(monthlyData)
      .sort((a, b) => a.fecha - b.fecha);
  }, [modo, datos, isAuthenticated]);

  const mesesDisponibles = useMemo(() => {
    const months = datosPorMes.map(mes => ({
      value: mes.key,
      label: mes.label
    }));
    return [{ value: 'all', label: 'Todos los meses' }, ...months];
  }, [datosPorMes]);

  const datosFiltrados = useMemo(() => {
    if (selectedMonth === 'all') {
      return datosPorMes;
    }
    return datosPorMes.filter(mes => mes.key === selectedMonth);
  }, [datosPorMes, selectedMonth]);

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

  // Authentication Screen con MediaPipe
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%'
        }}>
          <div style={{ fontSize: '3em', marginBottom: '20px' }}>👁️</div>
          
          <h1 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '2em' }}>
            Reconocimiento Facial
          </h1>
          
          <p style={{ color: '#7f8c8d', marginBottom: '30px', fontSize: '1.1em' }}>
            Sistema de autenticación biométrica con IA
          </p>

          {!isFaceIdAvailable ? (
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ color: '#e74c3c' }}>
                ⚠️ Cargando sistema de reconocimiento facial...
              </div>
            </div>
          ) : (
            <>
              {authError && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#ffeaa7',
                  color: '#e74c3c',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '1px solid #fab1a0'
                }}>
                  {authError}
                </div>
              )}

              {/* Área de la cámara */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '640px',
                margin: '0 auto 20px',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#000'
              }}>
                <video 
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transform: 'scaleX(-1)' // Espejo para mejor experiencia
                  }}
                  playsInline
                />
                <canvas 
                  ref={canvasRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  width="640"
                  height="480"
                />
              </div>

              {/* Estado de detección */}
              <div style={{
                padding: '15px',
                backgroundColor: faceDetected ? '#d4edda' : '#f8f9fa',
                color: faceDetected ? '#155724' : '#6c757d',
                borderRadius: '10px',
                marginBottom: '20px',
                border: `2px solid ${faceDetected ? '#c3e6cb' : '#e9ecef'}`,
                fontWeight: 'bold'
              }}>
                {isAuthenticating ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid currentColor',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '10px'
                    }}></div>
                    Verificando identidad...
                  </div>
                ) : (
                  detectionStatus
                )}
              </div>

              <button
                onClick={startFaceIdAuthentication}
                disabled={isAuthenticating}
                style={{
                  padding: '15px 30px',
                  backgroundColor: isAuthenticating ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: isAuthenticating ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%',
                  maxWidth: '300px',
                  marginBottom: '15px',
                  transition: 'all 0.3s',
                  opacity: isAuthenticating ? 0.7 : 1
                }}
              >
                {isAuthenticating ? '🔍 Analizando Rostro...' : '🎥 Iniciar Reconocimiento Facial'}
              </button>

              <div style={{
                fontSize: '12px',
                color: '#95a5a6',
                textAlign: 'center'
              }}>
                <p>• Asegúrate de tener buena iluminación</p>
                <p>• Mira directamente a la cámara</p>
                <p>• Permite el acceso a la cámara cuando se solicite</p>
              </div>
            </>
          )}
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // El resto de tu componente (loading y dashboard) se mantiene igual...
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
        color: 'white',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid transparent',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        Cargando datos financieros seguros...
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
      {/* Security Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px 25px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5em', marginRight: '10px' }}>🔒</div>
          <div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>Sesión Segura</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8em' }}>
              Autenticado con Reconocimiento Facial IA
            </div>
          </div>
        </div>
        
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🚪 Cerrar Sesión
        </button>
      </div>

      {/* El resto de tu dashboard permanece igual */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'white', fontSize: '2.5em', marginBottom: '10px' }}>
            📊 Análisis Mensual Seguro
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1em' }}>
            Autenticado con Reconocimiento Facial - Comparativa de Ingresos vs Gastos
          </p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
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
                <option key={mes.value} value={mes.value}>{mes.label}</option>
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
            <div style={{ fontSize: '0.8em', opacity: 0.9 }}>Balance</div>
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
          <h3 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
            📈 Comparativa Mensual - {modo === 'empresa' ? 'Empresa' : 'Personal'}
          </h3>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Mes</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Ingresos</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Gastos</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Balance</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Transacciones</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((mes, index) => (
                  <tr key={mes.key} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{mes.label}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>
                      ${mes.ingresos.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#e74c3c', fontWeight: 'bold' }}>
                      ${mes.gastos.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: mes.balance >= 0 ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                      ${mes.balance.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{mes.transacciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FinancialChart;