import { useState } from "react";

const initialForm = {
  nombre: "",
  apellido: "",
  fecha_alta: "",
};

function validateForm(values) {
  const errors = {};
  const today = new Date().toISOString().slice(0, 10);

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!values.apellido.trim()) {
    errors.apellido = "El apellido es obligatorio.";
  }

  if (!values.fecha_alta) {
    errors.fecha_alta = "La fecha de alta es obligatoria.";
  } else if (values.fecha_alta > today) {
    errors.fecha_alta = "La fecha de alta no puede ser futura.";
  }

  return errors;
}

function PersonaForm({ onCreatePersona }) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const isLoading = status === "loading";

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Revisa los campos marcados.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await onCreatePersona({
        nombre: values.nombre.trim(),
        apellido: values.apellido.trim(),
        fecha_alta: values.fecha_alta,
      });
      setValues(initialForm);
      setErrors({});
      setStatus("success");
      setMessage("Persona guardada correctamente.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <form className="persona-form" aria-label="Formulario de carga de persona" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={values.nombre}
          onChange={handleChange}
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
        />
        {errors.nombre ? <p className="field-error" id="nombre-error">{errors.nombre}</p> : null}
      </div>

      <div className="field-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          placeholder="Apellido"
          value={values.apellido}
          onChange={handleChange}
          aria-invalid={Boolean(errors.apellido)}
          aria-describedby={errors.apellido ? "apellido-error" : undefined}
        />
        {errors.apellido ? <p className="field-error" id="apellido-error">{errors.apellido}</p> : null}
      </div>

      <div className="field-group">
        <label htmlFor="fecha_alta">Fecha de alta</label>
        <input
          id="fecha_alta"
          name="fecha_alta"
          type="date"
          value={values.fecha_alta}
          onChange={handleChange}
          aria-invalid={Boolean(errors.fecha_alta)}
          aria-describedby={errors.fecha_alta ? "fecha-alta-error" : undefined}
        />
        {errors.fecha_alta ? (
          <p className="field-error" id="fecha-alta-error">{errors.fecha_alta}</p>
        ) : null}
      </div>

      <button className="primary-action" type="submit" disabled={isLoading}>
        {isLoading ? "Guardando" : "Guardar"}
      </button>

      {message ? (
        <p className={`form-message form-message-${status}`} role={status === "error" ? "alert" : "status"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

export default PersonaForm;
