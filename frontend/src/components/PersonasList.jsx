import EmptyState from "./EmptyState.jsx";
import ErrorState from "./ErrorState.jsx";

function PersonasList({ personas = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="state-box" role="status">
        <strong>Cargando personas</strong>
        <p>Preparando el listado.</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="No se pudo cargar el listado"
        message={error}
      />
    );
  }

  if (personas.length === 0) {
    return (
      <EmptyState
        title="Sin personas cargadas"
        message="El listado se completara cuando el modulo de carga este implementado."
      />
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de alta</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.fecha_alta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonasList;
