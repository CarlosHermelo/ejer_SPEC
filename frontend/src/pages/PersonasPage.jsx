import { useCallback, useEffect, useState } from "react";

import PersonaForm from "../components/PersonaForm.jsx";
import PersonasList from "../components/PersonasList.jsx";
import { createPersona, listPersonas } from "../api/personas.js";

function PersonasPage() {
  const [personas, setPersonas] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(null);

  const loadPersonas = useCallback(async () => {
    setLoadingList(true);
    setListError(null);

    try {
      const data = await listPersonas();
      setPersonas(data);
    } catch (error) {
      setListError(error.message);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);

  async function handleCreatePersona(payload) {
    await createPersona(payload);
    await loadPersonas();
  }

  return (
    <main className="people-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Gestion interna</p>
          <h1>Personas</h1>
        </div>
        <span className="status-pill">Modelo UI</span>
      </header>

      <section className="workspace-grid" aria-label="Gestion de personas">
        <section className="tool-panel" aria-labelledby="form-title">
          <div className="section-heading">
            <h2 id="form-title">Carga</h2>
            <p>Campos definidos para el MVP.</p>
          </div>
          <PersonaForm onCreatePersona={handleCreatePersona} />
        </section>

        <section className="tool-panel" aria-labelledby="list-title">
          <div className="section-heading">
            <h2 id="list-title">Consulta</h2>
            <p>Listado base preparado para datos persistidos.</p>
          </div>
          <PersonasList personas={personas} loading={loadingList} error={listError} />
        </section>
      </section>
    </main>
  );
}

export default PersonasPage;
