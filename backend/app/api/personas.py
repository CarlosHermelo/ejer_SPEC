from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.schemas.persona import PersonaCreate, PersonaRead
from app.services.personas import create_persona, list_personas

router = APIRouter(prefix="/personas", tags=["personas"])


@router.post("", response_model=PersonaRead, status_code=status.HTTP_201_CREATED)
def post_persona(persona_in: PersonaCreate, db: Session = Depends(get_db)) -> PersonaRead:
    return create_persona(db, persona_in)


@router.get("", response_model=list[PersonaRead])
def get_personas(db: Session = Depends(get_db)) -> list[PersonaRead]:
    return list_personas(db)
