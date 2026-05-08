from datetime import date, timedelta


def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_crear_persona(client):
    payload = {"nombre": "Ana", "apellido": "Lopez", "fecha_alta": "2024-01-15"}
    r = client.post("/personas", json=payload)
    assert r.status_code == 201
    data = r.json()
    assert data["nombre"] == "Ana"
    assert data["apellido"] == "Lopez"
    assert data["id"] is not None


def test_listar_personas_vacio(client):
    r = client.get("/personas")
    assert r.status_code == 200
    assert r.json() == []


def test_listar_personas(client):
    client.post("/personas", json={"nombre": "Ana", "apellido": "Lopez", "fecha_alta": "2024-01-15"})
    client.post("/personas", json={"nombre": "Juan", "apellido": "Perez", "fecha_alta": "2024-06-20"})
    r = client.get("/personas")
    assert r.status_code == 200
    assert len(r.json()) == 2


def test_orden_por_fecha_alta_desc(client):
    client.post("/personas", json={"nombre": "Primero", "apellido": "A", "fecha_alta": "2023-01-01"})
    client.post("/personas", json={"nombre": "Segundo", "apellido": "B", "fecha_alta": "2024-06-01"})
    r = client.get("/personas")
    personas = r.json()
    assert personas[0]["nombre"] == "Segundo"
    assert personas[1]["nombre"] == "Primero"


def test_crear_persona_sin_nombre_falla(client):
    r = client.post("/personas", json={"apellido": "Lopez", "fecha_alta": "2024-01-15"})
    assert r.status_code == 422


def test_crear_persona_sin_apellido_falla(client):
    r = client.post("/personas", json={"nombre": "Ana", "fecha_alta": "2024-01-15"})
    assert r.status_code == 422


def test_crear_persona_sin_fecha_falla(client):
    r = client.post("/personas", json={"nombre": "Ana", "apellido": "Lopez"})
    assert r.status_code == 422


def test_crear_persona_fecha_futura_falla(client):
    fecha_futura = (date.today() + timedelta(days=1)).isoformat()
    r = client.post("/personas", json={"nombre": "Ana", "apellido": "Lopez", "fecha_alta": fecha_futura})
    assert r.status_code == 422


def test_crear_persona_nombre_vacio_falla(client):
    r = client.post("/personas", json={"nombre": "   ", "apellido": "Lopez", "fecha_alta": "2024-01-15"})
    assert r.status_code == 422
