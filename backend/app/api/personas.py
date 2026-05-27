from fastapi import APIRouter, Depends, status
from supabase import Client

from app.db.client import get_supabase
from app.schemas.persona import PersonaCreate, PersonaRead
from app.services.personas import create_persona, list_personas

router = APIRouter(prefix="/personas", tags=["personas"])


@router.post("", response_model=PersonaRead, status_code=status.HTTP_201_CREATED)
def post_persona(persona_in: PersonaCreate, db: Client = Depends(get_supabase)) -> PersonaRead:
    return create_persona(db, persona_in)


@router.get("", response_model=list[PersonaRead])
def get_personas(db: Client = Depends(get_supabase)) -> list[PersonaRead]:
    return list_personas(db)
