import ErrorState from "../components/ErrorState.jsx";
import PersonaForm from "../components/PersonaForm.jsx";
import PersonasList from "../components/PersonasList.jsx";

function PersonasPage() {
  const error = null;

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
          <PersonaForm />
        </section>

        <section className="tool-panel" aria-labelledby="list-title">
          <div className="section-heading">
            <h2 id="list-title">Consulta</h2>
            <p>Listado base preparado para datos persistidos.</p>
          </div>
          {error ? (
            <ErrorState title="No se pudo cargar el listado" message={error} />
          ) : (
            <PersonasList />
          )}
        </section>
      </section>
    </main>
  );
}

export default PersonasPage;
