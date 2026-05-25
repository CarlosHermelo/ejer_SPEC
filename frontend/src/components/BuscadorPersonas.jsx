import { useState } from "react";
import EmptyState from "./EmptyState.jsx";

function BuscadorPersonas({ personas = [] }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState(null);

  const puedesBuscar = query.trim().length >= 3;

  function handleBuscar() {
    const q = query.trim().toLowerCase();
    setResultados(
      personas.filter((p) => p.nombre.toLowerCase().includes(q))
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && puedesBuscar) handleBuscar();
  }

  return (
    <div className="buscador">
      <div className="buscador-controls">
        <div className="field-group" style={{ flex: 1 }}>
          <label htmlFor="buscador-nombre">Buscar por nombre</label>
          <input
            id="buscador-nombre"
            type="text"
            placeholder="Ej: María (mínimo 3 caracteres)"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setResultados(null); }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className="primary-action"
          type="button"
          disabled={!puedesBuscar}
          onClick={handleBuscar}
        >
          Buscar
        </button>
      </div>

      {!puedesBuscar && query.length > 0 && (
        <p className="field-error" role="alert">
          Ingresá al menos 3 caracteres para buscar.
        </p>
      )}

      {resultados !== null && (
        resultados.length === 0 ? (
          <EmptyState
            title="Sin resultados"
            message={`No se encontraron clientes con nombre que contenga «${query.trim()}».`}
          />
        ) : (
          <div className="table-wrap">
            <table aria-label="Resultados de búsqueda">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha de alta</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.apellido}</td>
                    <td>{p.fecha_alta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default BuscadorPersonas;
