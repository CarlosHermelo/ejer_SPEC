function PersonaForm() {
  return (
    <form className="persona-form" aria-label="Formulario de carga de persona">
      <div className="field-group">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" placeholder="Nombre" />
      </div>

      <div className="field-group">
        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" name="apellido" type="text" placeholder="Apellido" />
      </div>

      <div className="field-group">
        <label htmlFor="fecha_alta">Fecha de alta</label>
        <input id="fecha_alta" name="fecha_alta" type="date" />
      </div>

      <button className="primary-action" type="button" disabled>
        Guardar
      </button>
    </form>
  );
}

export default PersonaForm;
