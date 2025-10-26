import React from "react";
import ArdanaLanding from "./pages/Inicio";

import { useState } from 'react';

export default function App() {
  const [vistaActual, setVistaActual] = useState<'personal' | 'empresa'>('personal');

  return (
    <div style={{ fontFamily: "Arial, -apple-system, Roboto, Helvetica, sans-serif" }}>
      {/* Header */}
      <div style={{ 
        background: '#BE1D20', 
        padding: '48pxs 24px', 
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{ fontSize: 42, fontWeight: 700, margin: 0 }}>
          🏛️ Banorte - Asistente Financiero
        </h1>
      </div>

      {/* Botones Personal/Empresa */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 16, 
        padding: '32px 0',
        background: '#fff'
      }}>
        <button
          onClick={() => setVistaActual('personal')}
          style={{
            padding: '16px 48px',
            background: vistaActual === 'personal' ? '#BE1D20' : '#d1d5db',
            color: vistaActual === 'personal' ? '#fff' : '#000',
            border: 'none',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          👤 Personales
        </button>
        <button
          onClick={() => setVistaActual('empresa')}
          style={{
            padding: '16px 48px',
            background: vistaActual === 'empresa' ? '#BE1D20' : '#d1d5db',
            color: vistaActual === 'empresa' ? '#fff' : '#000',
            border: 'none',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🏢 Empresas
        </button>
      </div>

      {/* Contenido dinámico */}
      <main>
        {vistaActual === 'personal' ? <SimuladorPersonal /> : <SimuladorEmpresa />}
      </main>
    </div>
  );
}

// =====================================================
// SIMULADOR PERSONAL - CÓDIGO ORIGINAL
// =====================================================
function SimuladorPersonal() {
  const [ingresos, setIngresos] = useState("40,000");
  const [egresos, setEgresos] = useState("40,000");
  const [gastosFijos, setGastosFijos] = useState({
    salud: false,
    restaurantes: false,
    comidas: false,
    supermercado: false,
    entretenimiento: false,
    servicios: false,
    educacion: false,
    transporte: false,
    transacciones: false,
  });

  const toggle = (k: keyof typeof gastosFijos) =>
    setGastosFijos((p) => ({ ...p, [k]: !p[k] }));

  const cardStyle = {
    borderRadius: 12.75,
    background: "linear-gradient(135deg, #BE1D20 26.9%, #21252C 100%)",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.10)",
    padding: 24,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      {/* Hero Banner */}
      <div style={{ background: "#8A0000", padding: "48px 24px", color: "#fff", marginBottom: 48, borderRadius: 12 }}>
        <h1 style={{ font: "700 42px 'DM Sans', Arial, sans-serif", lineHeight: 1.31, margin: "0 0 8px" }}>
          Bienvenida de Regreso,<br />Mariana
        </h1>
        <p style={{ font: "500 16px Roboto, Arial, sans-serif", letterSpacing: 0.5 }}>Planeamos tu futuro</p>
      </div>

      <h2 style={{ color: "#8A0000", fontWeight: 700, fontSize: 25, margin: "0 0 16px" }}>
        Simula tus escenarios financieros.
      </h2>
      <p style={{ color: "#8A0000", fontSize: 25, margin: "0 0 24px" }}>
        Ajusta tus ingresos, gastos o inversiones y observa cómo cambia tu proyección en tiempo real.
      </p>

      {/* Cards de Ingresos/Egresos */}
      <div style={{ 
        display: "grid", 
        gap: 24, 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        marginBottom: 24 
      }}>
        <div style={cardStyle}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Ingresos</h3>
          <div style={{ background: "#fff", borderRadius: 8, padding: "12px 24px" }}>
            <input
              style={{ width: "100%", textAlign: "center", fontWeight: 700, fontSize: 26, color: "#AEAEAE", border: "none", outline: "none" }}
              value={ingresos}
              onChange={(e) => setIngresos(e.target.value)}
            />
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Egresos</h3>
          <div style={{ background: "#fff", borderRadius: 8, padding: "12px 24px" }}>
            <input
              style={{ width: "100%", textAlign: "center", fontWeight: 700, fontSize: 26, color: "#AEAEAE", border: "none", outline: "none" }}
              value={egresos}
              onChange={(e) => setEgresos(e.target.value)}
            />
          </div>
        </div>

        <div style={{ ...cardStyle, minHeight: 369 }}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: 0 }}>Tasa de Valores</h3>
        </div>
      </div>

      {/* Gastos Fijos */}
      <div style={{ ...cardStyle, marginBottom: 32 }}>
        <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Gastos Fijos</h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "14px 32px" 
        }}>
          <Check label="Salud" checked={gastosFijos.salud} onChange={() => toggle("salud")} />
          <Check label="Supermercado" checked={gastosFijos.supermercado} onChange={() => toggle("supermercado")} />
          <Check label="Educación" checked={gastosFijos.educacion} onChange={() => toggle("educacion")} />
          <Check label="Restaurantes" checked={gastosFijos.restaurantes} onChange={() => toggle("restaurantes")} />
          <Check label="Entretenimiento" checked={gastosFijos.entretenimiento} onChange={() => toggle("entretenimiento")} />
          <Check label="Transporte" checked={gastosFijos.transporte} onChange={() => toggle("transporte")} />
          <Check label="Comidas" checked={gastosFijos.comidas} onChange={() => toggle("comidas")} />
          <Check label="Servicios" checked={gastosFijos.servicios} onChange={() => toggle("servicios")} />
          <Check label="Transacciones" checked={gastosFijos.transacciones} onChange={() => toggle("transacciones")} />
        </div>
      </div>

      {/* Gráfica */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#8A0000", fontSize: 35, margin: "0 0 16px" }}>Grafica de Valores</h3>
        <div style={{ 
          border: "4px solid #BE1D20", 
          borderRadius: 12.75, 
          minHeight: 260, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "#f9fafb"
        }}>
          <span style={{ color: "#9ca3af", fontSize: 18 }}>Gráfica de valores aquí</span>
        </div>
      </div>

      {/* Chat con IA */}
      <div style={{ background: "#f3f4f6", borderRadius: 12, padding: 32, marginBottom: 32 }}>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
          💬 Chat con Asistente IA
        </h3>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="Pregunta algo sobre tus finanzas..."
            style={{
              flex: 1,
              padding: "16px 24px",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          <button style={{
            background: "#BE1D20",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: 8,
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}>
            Enviar
          </button>
        </div>
      </div>

      {/* Transacciones */}
      <div>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
          📊 Transacciones (personales)
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <thead>
            <tr style={{ background: "#BE1D20", color: "#fff" }}>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 700 }}>Fecha</th>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 700 }}>Descripción</th>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 700 }}>Categoría</th>
              <th style={{ padding: 16, textAlign: "right", fontWeight: 700 }}>Monto</th>
              <th style={{ padding: 16, textAlign: "center", fontWeight: 700 }}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: 16 }}></td>
              <td style={{ padding: 16 }}>Alimentos</td>
              <td style={{ padding: 16 }}>Alimentos</td>
              <td style={{ padding: 16, textAlign: "right", color: "#BE1D20", fontWeight: 700 }}>$-500</td>
              <td style={{ padding: 16, textAlign: "center" }}>🚫</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: 16 }}></td>
              <td style={{ padding: 16 }}>Gasolina</td>
              <td style={{ padding: 16 }}>Gasolina</td>
              <td style={{ padding: 16, textAlign: "right", color: "#BE1D20", fontWeight: 700 }}>$-1,200</td>
              <td style={{ padding: 16, textAlign: "center" }}>🚫</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: 16 }}></td>
              <td style={{ padding: 16 }}>Restaurantes</td>
              <td style={{ padding: 16 }}>Restaurantes</td>
              <td style={{ padding: 16, textAlign: "right", color: "#BE1D20", fontWeight: 700 }}>$-350</td>
              <td style={{ padding: 16, textAlign: "center" }}>🚫</td>
            </tr>
            <tr>
              <td style={{ padding: 16 }}></td>
              <td style={{ padding: 16 }}>Salario</td>
              <td style={{ padding: 16 }}>Salario</td>
              <td style={{ padding: 16, textAlign: "right", color: "#059669", fontWeight: 700 }}>$15,000</td>
              <td style={{ padding: 16, textAlign: "center" }}>💰</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA Final */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "48px 0" }}>
        <button style={{
          background: "#5B0202",
          color: "#fff",
          padding: "28px 32px",
          borderRadius: 999,
          font: "700 16px 'DM Sans', Arial, sans-serif",
          letterSpacing: 1.6,
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer"
        }}>
          Consulta con la AI
        </button>
        <p style={{ color: "#8A0000", fontSize: 35, textAlign: "center", lineHeight: 1.1 }}>
          De la intención a la acción,<br />Ardana lo hace posible.
        </p>
      </div>
    </div>
  );
}

// =====================================================
// SIMULADOR EMPRESA - CÓDIGO ORIGINAL
// =====================================================
function SimuladorEmpresa() {
  const [userType, setUserType] = useState<"empresarial" | "personal">("empresarial");
  const [ingresos, setIngresos] = useState("40,000");
  const [egresos, setEgresos] = useState("40,000");
  const [gastosFijos, setGastosFijos] = useState({
    salud: false,
    restaurantes: false,
    comidas: false,
    supermercado: false,
    entretenimiento: false,
    servicios: false,
    educacion: false,
    transporte: false,
    transacciones: false,
  });

  const toggle = (k: keyof typeof gastosFijos) =>
    setGastosFijos((p) => ({ ...p, [k]: !p[k] }));

  const cardStyle = {
    borderRadius: 12.75,
    background: "linear-gradient(135deg, #BE1D20 26.9%, #21252C 100%)",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.10)",
    padding: 24,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" }}>
      {/* Hero */}
      <section style={{ background: "#8A0000", padding: "48px 24px", color: "#fff", marginBottom: 48, borderRadius: 12 }}>
        <h1 style={{ font: "700 42px 'DM Sans', Arial, sans-serif", lineHeight: 1.31, margin: "0 0 8px" }}>
          Bienvenida de Regreso,<br />Empresa
        </h1>
        <p style={{ font: "500 16px Roboto, Arial, sans-serif", letterSpacing: 0.5 }}>Planeamos tu futuro</p>
      </section>

      {/* Content */}
      <h2 style={{ color: "#8A0000", fontWeight: 700, fontSize: 25, margin: "0 0 16px" }}>
        Simula tus escenarios financieros.
      </h2>
      <p style={{ color: "#8A0000", fontSize: 25, margin: "0 0 24px" }}>
        Ajusta tus ingresos, gastos o inversiones y observa cómo cambia tu proyección en tiempo real.
      </p>

      <h3 style={{ color: "#8A0000", fontWeight: 700, margin: "24px 0 12px" }}>Seleciona tu Usuario</h3>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginBottom: 24 }}>
        <button
          style={{
            padding: "16px 36px",
            border: "2.5px solid #BE1D20",
            borderRadius: 12.75,
            fontSize: 20,
            background: userType === "empresarial" ? "#BE1D20" : "#fff",
            color: userType === "empresarial" ? "#fff" : "#000",
            cursor: "pointer",
            fontWeight: 600
          }}
          onClick={() => setUserType("empresarial")}
        >
          Empresarial
        </button>
        <button
          style={{
            padding: "16px 36px",
            border: "2.5px solid #BE1D20",
            borderRadius: 12.75,
            fontSize: 20,
            background: userType === "personal" ? "#BE1D20" : "#fff",
            color: userType === "personal" ? "#fff" : "#000",
            cursor: "pointer",
            fontWeight: 600
          }}
          onClick={() => setUserType("personal")}
        >
          Personal
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginBottom: 24 }}>
        <div style={cardStyle}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Ingresos</h3>
          <div style={{ background: "#fff", borderRadius: 8, padding: "12px 24px" }}>
            <input
              style={{ width: "100%", textAlign: "center", fontWeight: 700, fontSize: 26, color: "#AEAEAE", border: "none", outline: "none" }}
              value={ingresos}
              onChange={(e) => setIngresos(e.target.value)}
            />
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Egresos</h3>
          <div style={{ background: "#fff", borderRadius: 8, padding: "12px 24px" }}>
            <input
              style={{ width: "100%", textAlign: "center", fontWeight: 700, fontSize: 26, color: "#AEAEAE", border: "none", outline: "none" }}
              value={egresos}
              onChange={(e) => setEgresos(e.target.value)}
            />
          </div>
        </div>

        <div style={{ ...cardStyle, minHeight: 369 }}>
          <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: 0 }}>Tasa de Valores</h3>
        </div>
      </div>

      {/* Gastos Fijos */}
      <div style={{ ...cardStyle, marginBottom: 32 }}>
        <h3 style={{ color: "#F3E8FF", fontWeight: 700, fontSize: 26, margin: "0 0 24px" }}>Gastos Fijos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px 32px" }}>
          <Check label="Salud" checked={gastosFijos.salud} onChange={() => toggle("salud")} />
          <Check label="Supermercado" checked={gastosFijos.supermercado} onChange={() => toggle("supermercado")} />
          <Check label="Educación" checked={gastosFijos.educacion} onChange={() => toggle("educacion")} />
          <Check label="Restaurantes" checked={gastosFijos.restaurantes} onChange={() => toggle("restaurantes")} />
          <Check label="Entretenimiento" checked={gastosFijos.entretenimiento} onChange={() => toggle("entretenimiento")} />
          <Check label="Transporte" checked={gastosFijos.transporte} onChange={() => toggle("transporte")} />
          <Check label="Comidas" checked={gastosFijos.comidas} onChange={() => toggle("comidas")} />
          <Check label="Servicios" checked={gastosFijos.servicios} onChange={() => toggle("servicios")} />
          <Check label="Transacciones" checked={gastosFijos.transacciones} onChange={() => toggle("transacciones")} />
        </div>
      </div>

      {/* Gráfica */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#8A0000", fontSize: 35, margin: "0 0 16px" }}>Grafica de Valores</h3>
        <div style={{ 
          border: "4px solid #BE1D20", 
          borderRadius: 12.75, 
          minHeight: 260, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "#f9fafb"
        }}>
          <span style={{ color: "#9ca3af" }}>Gráfica de valores aquí</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "24px 0" }}>
        <button style={{
          background: "#5B0202",
          color: "#fff",
          padding: "28px 32px",
          borderRadius: 999,
          font: "700 16px 'DM Sans', Arial, sans-serif",
          letterSpacing: 1.6,
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer"
        }}>
          Consulta con la AI
        </button>
        <p style={{ color: "#8A0000", fontSize: 35, textAlign: "center", lineHeight: 1.1 }}>
          De la intención a la acción,<br />Ardana lo hace posible.
        </p>
      </div>
    </div>
  );
}

// =====================================================
// COMPONENTE CHECK - COMPARTIDO
// =====================================================
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
      <span
        onClick={onChange}
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          border: "2px solid #fff",
          background: checked ? "#fff" : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="#BE1D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ color: "#fff", fontSize: 20 }}>{label}</span>
    </label>
    
  );
}
