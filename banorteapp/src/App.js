import React, { useState, useEffect } from 'react';
import { api } from './api';
import './App.css';

function App() {
  const [transacciones, setTransacciones] = useState([]);
  const [tipo, setTipo] = useState('personales');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [respuestaIA, setRespuestaIA] = useState('');

  // Cargar transacciones al cambiar el tipo
  useEffect(() => {
    cargarTransacciones();
  }, [tipo]);

  const cargarTransacciones = async () => {
    setLoading(true);
    try {
      const data = await api.getTransacciones(tipo);
      setTransacciones(data);
    } catch (error) {
      console.error('Error cargando transacciones:', error);
      alert('Error al cargar transacciones. ¿Está el backend corriendo?');
    }
    setLoading(false);
  };

  const chatConIA = async () => {
    if (!mensaje.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.chat(tipo, mensaje);
      setRespuestaIA(response.respuesta);
    } catch (error) {
      console.error('Error en chat:', error);
      alert('Error al chatear con IA');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header style={{ background: '#E60012', padding: '20px', color: 'white' }}>
        <h1>🏦 Banorte - Asistente Financiero</h1>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Toggle Personales/Empresas */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setTipo('personales')}
            style={{
              padding: '10px 20px',
              background: tipo === 'personales' ? '#E60012' : '#ccc',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            💼 Personales
          </button>
          <button 
            onClick={() => setTipo('empresas')}
            style={{
              padding: '10px 20px',
              background: tipo === 'empresas' ? '#E60012' : '#ccc',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            🏢 Empresas
          </button>
        </div>

        {/* Chat con IA */}
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px' 
        }}>
          <h2>💬 Chat con Asistente IA</h2>
          <input 
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Pregunta algo sobre tus finanzas..."
            style={{
              width: '70%',
              padding: '10px',
              marginRight: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && chatConIA()}
          />
          <button 
            onClick={chatConIA}
            disabled={loading}
            style={{
              padding: '10px 20px',
              background: '#E60012',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>

          {respuestaIA && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: 'white',
              borderRadius: '4px',
              borderLeft: '4px solid #E60012'
            }}>
              <strong>🤖 Respuesta:</strong>
              <p style={{ whiteSpace: 'pre-wrap' }}>{respuestaIA}</p>
            </div>
          )}
        </div>

        {/* Lista de Transacciones */}
        <div>
          <h2>📊 Transacciones ({tipo})</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ background: '#E60012', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Fecha</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Descripción</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Categoría</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Monto</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Tipo</th>
                </tr>
              </thead>
              
              <tbody>
                {transacciones.slice(0, 10).map((tx) => (
                  <tr key={tx.id_usuario} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{tx.fecha_legible}</td>
                    <td style={{ padding: '12px' }}>{tx.descripcion}</td>
                    <td style={{ padding: '12px' }}>{tx.categoria}</td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right',
                      color: tx.tipo === 'ingreso' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      ${tx.monto.toLocaleString('es-MX')}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'center' 
                    }}>
                      {tx.tipo === 'ingreso' ? '📈' : '📉'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;