import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import PersonaForm from "./PersonaForm";

describe("PersonaForm", () => {
  it("renderiza los campos del formulario", () => {
    render(<PersonaForm />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de alta")).toBeInTheDocument();
  });

  it("el botón Guardar está deshabilitado con campos vacíos", () => {
    render(<PersonaForm />);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeDisabled();
  });

  it("habilita Guardar cuando todos los campos tienen valor", async () => {
    render(<PersonaForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Apellido"), "Pérez");
    await user.type(screen.getByLabelText("Fecha de alta"), "2024-01-15");
    expect(screen.getByRole("button", { name: "Guardar" })).toBeEnabled();
  });

  it("muestra el mensaje de gracias al hacer clic en Guardar", async () => {
    render(<PersonaForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Apellido"), "Pérez");
    await user.type(screen.getByLabelText("Fecha de alta"), "2024-01-15");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(
      screen.getByText("¡Gracias! El cliente fue dado de alta correctamente.")
    ).toBeInTheDocument();
  });

  it("oculta el formulario tras guardar", async () => {
    render(<PersonaForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Nombre"), "Juan");
    await user.type(screen.getByLabelText("Apellido"), "Pérez");
    await user.type(screen.getByLabelText("Fecha de alta"), "2024-01-15");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.queryByRole("button", { name: "Guardar" })).not.toBeInTheDocument();
  });
});
