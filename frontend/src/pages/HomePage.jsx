import { useState, useEffect, useCallback } from "react";
import TopBar from "../components/TopBar.jsx";
import EnvioWhatsapp from "./EnvioWhatsapp.jsx";
import { createPersona, listPersonas } from "../api/personas.js";
import BuscadorPersonas from "../components/BuscadorPersonas.jsx";
import ErrorState from "../components/ErrorState.jsx";
import PersonaForm from "../components/PersonaForm.jsx";
import PersonasList from "../components/PersonasList.jsx";

function PlaceholderSection({ nombre }) {
  return (
    <div className="tool-panel" style={{ marginTop: 24 }}>
      <p style={{ color: "#516173", margin: 0 }}>Seccion {nombre} en construccion.</p>
    </div>
  );
}

function SupaCarga({ onCreatePersona }) {
  return (
    <div className="tool-panel" style={{ marginTop: 24 }}>
      <div className="section-heading">
        <h2>Carga</h2>
        <p>Alta de personas en el sistema.</p>
      </div>
      <PersonaForm onCreatePersona={onCreatePersona} />
    </div>
  );
}

function SupaConsulta({ personas, loading, error }) {
  return (
    <>
      <div className="tool-panel" style={{ marginTop: 24 }}>
        <div className="section-heading">
          <h2>Consulta</h2>
          <p>Personas registradas en Supabase.</p>
        </div>
        {error ? (
          <ErrorState title="No se pudo cargar el listado" message={error} />
        ) : (
          <PersonasList personas={personas} loading={loading} error={null} />
        )}
      </div>
      <div className="tool-panel" style={{ marginTop: 20 }}>
        <div className="section-heading">
          <h2>Busqueda de clientes</h2>
          <p>Ingresa al menos 3 caracteres del nombre y presa Buscar.</p>
        </div>
        <BuscadorPersonas personas={personas} />
      </div>
    </>
  );
}

export default function HomePage() {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPersonas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listPersonas();
      setPersonas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeItem === "SUPA") {
      fetchPersonas();
    }
  }, [activeItem, fetchPersonas]);

  function handleItemClick(item) {
    setActiveItem(item);
    setActiveSub(null);
  }

  function handleSubClick(sub) {
    setActiveSub(sub);
  }

  async function handleCreatePersona(payload) {
    await createPersona(payload);
    await fetchPersonas();
  }

  function renderContent() {
    if (!activeItem) return null;
    if (activeItem === "SUPA") {
      if (activeSub === "Carga") return <SupaCarga onCreatePersona={handleCreatePersona} />;
      if (activeSub === "Consulta") return <SupaConsulta personas={personas} loading={loading} error={error} />;
      return null;
    }
    if (activeItem === "WS") {
      if (activeSub === "Msj1") return <EnvioWhatsapp />;
      return null;
    }
    return <PlaceholderSection nombre={activeItem} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <TopBar
        activeItem={activeItem}
        activeSub={activeSub}
        onItemClick={handleItemClick}
        onSubClick={handleSubClick}
      />
      <main style={{ width: "min(100%, 1180px)", margin: "0 auto", padding: "0 32px 32px" }}>
        {renderContent()}
      </main>
    </div>
  );
}
