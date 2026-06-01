import { useState } from "react";

import EmptyState from "./EmptyState.jsx";
import ErrorState from "./ErrorState.jsx";

function PersonasList({ personas = [], loading = false, error = null, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

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

  async function handleDelete(id) {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await onDelete(id);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="table-wrap">
      {deleteError && (
        <p role="alert" style={{ color: "var(--color-error, red)", marginBottom: 8 }}>
          {deleteError}
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de alta</th>
            {typeof onDelete === "function" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.fecha_alta}</td>
              {typeof onDelete === "function" && (
                <td>
                  <button
                    type="button"
                    disabled={deletingId === persona.id}
                    onClick={() => handleDelete(persona.id)}
                    aria-label={`Eliminar a ${persona.nombre} ${persona.apellido}`}
                    className="btn-delete"
                  >
                    {deletingId === persona.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonasList;
