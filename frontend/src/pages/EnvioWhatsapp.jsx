import { useState } from "react";
import { sendMessage } from "../api/whatsapp.js";

export default function EnvioWhatsapp() {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleEnviar() {
    setLoading(true);
    setFeedback(null);
    try {
      await sendMessage(texto);
      setFeedback({ ok: true, msg: "Mensaje enviado con éxito." });
      setTexto("");
    } catch (err) {
      setFeedback({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tool-panel" style={{ marginTop: 24 }}>
      <div className="section-heading">
        <h2>Envío de mensaje WhatsApp</h2>
        <p>Escribí el mensaje y presioná Enviar.</p>
      </div>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={4}
        placeholder="Escribí el mensaje..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #cbd5e1",
          fontSize: 15,
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={handleEnviar}
        disabled={!texto.trim() || loading}
        style={{ marginTop: 12 }}
        className="topbar-btn topbar-btn--active"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
      {feedback && (
        <p
          style={{
            marginTop: 12,
            color: feedback.ok ? "#16a34a" : "#dc2626",
            fontWeight: 500,
          }}
        >
          {feedback.msg}
        </p>
      )}
    </div>
  );
}
