import os
from dotenv import load_dotenv
from supabase import create_client, Client


load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


def validar_configuracion():
    if not SUPABASE_URL:
        raise ValueError("Falta SUPABASE_URL en el archivo .env")

    if not SUPABASE_KEY:
        raise ValueError("Falta SUPABASE_KEY en el archivo .env")


def insertar_registros():
    validar_configuracion()

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    registros = [
        {"descripcion": "Registro insertado desde Python 10"},
        {"descripcion": "Registro insertado desde Python 20"},
        {"descripcion": "Registro insertado desde Python 30"},
        {"descripcion": "Registro insertado desde Python 40"},
        {"descripcion": "Registro insertado desde Python 50"},
    ]

    response = (
        supabase
        .table("registros")
        .insert(registros)
        .execute()
    )

    print("Registros insertados correctamente:")
    print(response.data)


if __name__ == "__main__":
    insertar_registros()