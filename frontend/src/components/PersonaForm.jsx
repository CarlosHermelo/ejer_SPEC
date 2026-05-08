import { useState } from "react";

function PersonaForm() {
  const [fields, setFields] = useState({ nombre: "", apellido: "", fecha_alta: "" });
  const [submitted, setSubmitted] = useState(false);

  const isComplete = fields.nombre.trim() && fields.apellido.trim() && fields.fecha_alta;

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleGuardar() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="thank-you-message" role="status" aria-live="polite">
        <p>¡Gracias! El cliente fue dado de alta correctamente.</p>
      </div>
    );
  }

  return (
    <form className="persona-form" aria-label="Formulario de carga de persona">
      <div className="field-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={fields.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="field-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Apellido"
          value={fields.apellido}
          onChange={handleChange}
        />
      </div>

      <div className="field-group">
        <label htmlFor="fecha_alta">Fecha de alta</label>
        <input
          id="fecha_alta"
          name="fecha_alta"
          type="date"
          value={fields.fecha_alta}
          onChange={handleChange}
        />
      </div>

      <button
        className="primary-action"
        type="button"
        disabled={!isComplete}
        onClick={handleGuardar}
      >
        Guardar
      </button>
    </form>
  );
}

export default PersonaForm;
