"""
Servidor web para crear las tablas de WhatsApp en Supabase.
Uso:  python crear_tablas.py
Abre: http://localhost:8080

Requiere en .env:
  SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.environ.get("SUPABASE_DB_URL")

TABLAS = ["whatsapp", "administrador_whatsapp", "clientes"]

HTML = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Crear Tablas — Supabase</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      max-width: 540px;
      margin: 72px auto;
      padding: 0 24px;
      color: #1a1a1a;
    }
    h1 { font-size: 1.6rem; margin-bottom: 6px; }
    p  { color: #555; margin-bottom: 24px; }
    .tabla {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      margin: 8px 0;
      background: #f5f5f5;
      border-radius: 8px;
      font-family: monospace;
      font-size: 15px;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #3ECF8E; flex-shrink: 0; }
    button {
      margin-top: 28px;
      padding: 12px 36px;
      background: #3ECF8E;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    button:hover:not(:disabled) { background: #2ea670; }
    button:disabled { opacity: 0.6; cursor: default; }
    #msg {
      margin-top: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 15px;
      display: none;
    }
    .ok    { background: #d4edda; color: #155724; }
    .error { background: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <h1>Crear Tablas en Supabase</h1>
  <p>Se ejecutará DROP (si existen) + CREATE de las siguientes tablas:</p>

  <div class="tabla"><span class="dot"></span>whatsapp</div>
  <div class="tabla"><span class="dot"></span>administrador_whatsapp</div>
  <div class="tabla"><span class="dot"></span>clientes</div>

  <br />
  <button id="btn" onclick="crear()">Crear</button>
  <div id="msg"></div>

  <script>
    async function crear() {
      const btn = document.getElementById('btn');
      const msg = document.getElementById('msg');
      btn.disabled = true;
      btn.textContent = 'Creando…';
      msg.style.display = 'none';
      try {
        const res  = await fetch('/crear', { method: 'POST' });
        const data = await res.json();
        msg.style.display = 'block';
        if (data.ok) {
          msg.className   = 'ok';
          msg.textContent = data.mensaje;
        } else {
          msg.className   = 'error';
          msg.textContent = 'Error: ' + data.error;
        }
      } catch (e) {
        msg.style.display = 'block';
        msg.className     = 'error';
        msg.textContent   = 'Error de red: ' + e.message;
      } finally {
        btn.disabled    = false;
        btn.textContent = 'Crear';
      }
    }
  </script>
</body>
</html>
"""

SQL = """
DROP TABLE IF EXISTS administrador_whatsapp CASCADE;
DROP TABLE IF EXISTS whatsapp CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;

CREATE TABLE whatsapp (
    id        BIGSERIAL PRIMARY KEY,
    fecha     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contenido TEXT,
    tema      TEXT,
    estado    TEXT,
    situacion TEXT,
    numero    TEXT
);

CREATE TABLE administrador_whatsapp (
    id          BIGSERIAL PRIMARY KEY,
    mensaje     TEXT,
    fecha       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    id_whatsapp BIGINT REFERENCES whatsapp(id),
    estado      TEXT
);

CREATE TABLE clientes (
    id              BIGSERIAL PRIMARY KEY,
    nombre          TEXT NOT NULL,
    numero_telefono TEXT,
    fecha_alta      DATE DEFAULT CURRENT_DATE
);
"""


def ejecutar_sql():
    conn = psycopg2.connect(DB_URL)
    try:
        conn.autocommit = True
        with conn.cursor() as cur:
            cur.execute(SQL)
    finally:
        conn.close()


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = HTML.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/crear":
            self.send_response(404)
            self.end_headers()
            return
        try:
            ejecutar_sql()
            payload = {"ok": True, "mensaje": "Tablas creadas"}
            status = 200
        except Exception as exc:
            payload = {"ok": False, "error": str(exc)}
            status = 500
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    if not DB_URL:
        print("Error: falta SUPABASE_DB_URL en el archivo .env")
        print(
            "Agregá en .env:\n"
            "  SUPABASE_DB_URL=postgresql://postgres:[password]"
            "@db.[project-ref].supabase.co:5432/postgres"
        )
        raise SystemExit(1)

    print("Servidor listo → http://localhost:8080")
    HTTPServer(("0.0.0.0", 8080), Handler).serve_forever()
