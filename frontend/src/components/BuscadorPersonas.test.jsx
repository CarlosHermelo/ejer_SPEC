import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import BuscadorPersonas from "./BuscadorPersonas";

const PERSONAS = [
  { id: 1, nombre: "María", apellido: "Gómez", fecha_alta: "2024-01-10" },
  { id: 2, nombre: "Marcos", apellido: "López", fecha_alta: "2024-02-15" },
  { id: 3, nombre: "Juan", apellido: "Pérez", fecha_alta: "2024-03-20" },
];

describe("BuscadorPersonas", () => {
  it("renderiza el campo y el botón", () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    expect(screen.getByLabelText("Buscar por nombre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  it("botón deshabilitado con menos de 3 caracteres", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "Ma");
    expect(screen.getByRole("button", { name: "Buscar" })).toBeDisabled();
  });

  it("muestra aviso cuando hay texto pero menos de 3 caracteres", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "Ma");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("botón habilitado con 3 o más caracteres", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "Mar");
    expect(screen.getByRole("button", { name: "Buscar" })).toBeEnabled();
  });

  it("muestra resultados coincidentes al buscar", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "mar");
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.getByText("María")).toBeInTheDocument();
    expect(screen.getByText("Marcos")).toBeInTheDocument();
    expect(screen.queryByText("Juan")).not.toBeInTheDocument();
  });

  it("muestra estado vacío cuando no hay coincidencias", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "xyz");
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });

  it("también busca al presionar Enter", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    await userEvent.type(screen.getByLabelText("Buscar por nombre"), "jua{Enter}");
    expect(screen.getByText("Juan")).toBeInTheDocument();
  });

  it("limpia resultados al modificar el input", async () => {
    render(<BuscadorPersonas personas={PERSONAS} />);
    const input = screen.getByLabelText("Buscar por nombre");
    await userEvent.type(input, "mar");
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(screen.getByText("María")).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "a");
    expect(screen.queryByText("María")).not.toBeInTheDocument();
  });
});
