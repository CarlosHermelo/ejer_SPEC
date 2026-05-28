from fastapi import HTTPException, status
from supabase import Client

from app.schemas.persona import PersonaCreate, PersonaRead


def create_persona(db: Client, persona_in: PersonaCreate) -> PersonaRead:
    data = {
        "nombre": persona_in.nombre,
        "apellido": persona_in.apellido,
        "fecha_alta": persona_in.fecha_alta.isoformat(),
    }
    result = db.table("personas").insert(data).execute()
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase no devolvio datos tras el insert. Verificar RLS policies.",
        )
    return PersonaRead(**result.data[0])


def list_personas(db: Client) -> list[PersonaRead]:
    result = (
        db.table("personas")
        .select("*")
        .order("fecha_alta", desc=True)
        .order("created_at", desc=True)
        .execute()
    )
    return [PersonaRead(**row) for row in result.data]
