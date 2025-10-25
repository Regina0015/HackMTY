const API_URL = 'http://localhost:3001';

export const api = {
  // Obtener transacciones
  async getTransacciones() {
    try {
      const response = await fetch(`${API_URL}/api/transacciones`);
      if (!response.ok) throw new Error('Error al obtener transacciones');
      return await response.json();
    } catch (error) {
      console.error('Error fetching transacciones:', error);
      throw error;
    }
  },

  // Agregar transacción
  async addTransaccion(transaccion) {
    try {
      const response = await fetch(`${API_URL}/api/transacciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaccion)
      });
      if (!response.ok) throw new Error('Error al agregar transacción');
      return await response.json();
    } catch (error) {
      console.error('Error adding transaccion:', error);
      throw error;
    }
  },

  // Chat con Gemini
  async chat(mensaje) {
    try {
      console.log('Enviando mensaje:', mensaje);
      console.log('URL:', `${API_URL}/api/chat`);
      
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error en el chat: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error en chat:', error);
      throw error;
    }
  },

  // Obtener saldos
  async getSaldos() {
    try {
      const response = await fetch(`${API_URL}/api/saldos`);
      if (!response.ok) throw new Error('Error al obtener saldos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching saldos:', error);
      throw error;
    }
  },

  // Análisis con IA
  async getAnalisisIA() {
    try {
      const response = await fetch(`${API_URL}/api/analisis-inteligente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error en análisis IA');
      return await response.json();
    } catch (error) {
      console.error('Error en análisis IA:', error);
      throw error;
    }
  },

  // Obtener todos los datos
  async getDatos() {
    try {
      const response = await fetch(`${API_URL}/api/datos`);
      if (!response.ok) throw new Error('Error al obtener datos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching datos:', error);
      throw error;
    }
  }
};