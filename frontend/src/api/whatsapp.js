const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar VITE_API_BASE_URL.");
  }
  return API_BASE_URL.replace(/\/$/, "");
}

export async function sendMessage(text) {
  const response = await fetch(`${getApiBaseUrl()}/whatsapp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });

  if (!response.ok) {
    let detail = "No se pudo enviar el mensaje.";
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

  return response.json();
}
