const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar VITE_API_BASE_URL.");
  }
  return API_BASE_URL.replace(/\/$/, "");
}

export async function createPersona(payload) {
  const response = await fetch(`${getApiBaseUrl()}/personas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = "No se pudo guardar la persona.";
    try {
      const data = await response.json();
      if (typeof data.detail === "string") {
        detail = data.detail;
      } else if (Array.isArray(data.detail)) {
        detail = data.detail
          .map((item) => item.msg)
          .filter(Boolean)
          .join(" ");
      }
    } catch {
      detail = `Error ${response.status} del servidor. Revisa los logs de Vercel.`;
    }
    throw new Error(detail || "No se pudo guardar la persona.");
  }

  return response.json();
}

export async function listPersonas() {
  const response = await fetch(`${getApiBaseUrl()}/personas`);

  if (!response.ok) {
    throw new Error("No se pudo cargar el listado de personas.");
  }

  return response.json();
}

export async function deletePersona(id) {
  const response = await fetch(`${getApiBaseUrl()}/personas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let detail = "No se pudo eliminar la persona.";
    try {
      const data = await response.json();
      if (typeof data.detail === "string") {
        detail = data.detail;
      }
    } catch {
      detail = `Error ${response.status} del servidor.`;
    }
    throw new Error(detail);
  }
}
