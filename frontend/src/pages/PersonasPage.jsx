import BuscadorPersonas from "../components/BuscadorPersonas.jsx";
import ErrorState from "../components/ErrorState.jsx";
import PersonaForm from "../components/PersonaForm.jsx";
import PersonasList from "../components/PersonasList.jsx";

const PERSONAS_EJEMPLO = [
  { id: 1, nombre: "María", apellido: "Gómez", fecha_alta: "2024-01-10" },
  { id: 2, nombre: "Marcos", apellido: "López", fecha_alta: "2024-02-15" },
  { id: 3, nombre: "Juan", apellido: "Pérez", fecha_alta: "2024-03-20" },
  { id: 4, nombre: "Mariana", apellido: "Fernández", fecha_alta: "2024-04-05" },
  { id: 5, nombre: "Carlos", apellido: "Martínez", fecha_alta: "2024-05-18" },
];

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

      <section className="tool-panel" style={{ marginTop: 20 }} aria-labelledby="busqueda-title">
        <div className="section-heading">
          <h2 id="busqueda-title">Búsqueda de clientes</h2>
          <p>Ingresá al menos 3 caracteres del nombre y presá Buscar.</p>
        </div>
        <BuscadorPersonas personas={PERSONAS_EJEMPLO} />
      </section>
    </main>
  );
}

export default PersonasPage;
