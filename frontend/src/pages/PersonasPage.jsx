import { useState, useEffect, useCallback } from "react";

import { createPersona, listPersonas } from "../api/personas.js";
import BuscadorPersonas from "../components/BuscadorPersonas.jsx";
import ErrorState from "../components/ErrorState.jsx";
import PersonaForm from "../components/PersonaForm.jsx";
import PersonasList from "../components/PersonasList.jsx";

function PersonasPage() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetchPersonas();
  }, [fetchPersonas]);

  async function handleCreatePersona(payload) {
    await createPersona(payload);
    await fetchPersonas();
  }

  return (
    <main className="people-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Gestion interna</p>
          <h1>Personas</h1>
        </div>
      </header>

      <section className="workspace-grid" aria-label="Gestion de personas">
        <section className="tool-panel" aria-labelledby="form-title">
          <div className="section-heading">
            <h2 id="form-title">Carga</h2>
            <p>Alta de personas en el sistema.</p>
          </div>
          <PersonaForm onCreatePersona={handleCreatePersona} />
        </section>

        <section className="tool-panel" aria-labelledby="list-title">
          <div className="section-heading">
            <h2 id="list-title">Consulta</h2>
            <p>Personas registradas en Supabase.</p>
          </div>
          {error ? (
            <ErrorState title="No se pudo cargar el listado" message={error} />
          ) : (
            <PersonasList personas={personas} loading={loading} error={null} />
          )}
        </section>
      </section>

      <section className="tool-panel" style={{ marginTop: 20 }} aria-labelledby="busqueda-title">
        <div className="section-heading">
          <h2 id="busqueda-title">Busqueda de clientes</h2>
          <p>Ingresa al menos 3 caracteres del nombre y presa Buscar.</p>
        </div>
        <BuscadorPersonas personas={personas} />
      </section>
    </main>
  );
}

export default PersonasPage;
