from sqlalchemy.orm import Session

from app.models.persona import Persona
from app.schemas.persona import PersonaCreate


def create_persona(db: Session, persona_in: PersonaCreate) -> Persona:
    persona = Persona(**persona_in.model_dump())
    db.add(persona)
    db.commit()
    db.refresh(persona)
    return persona


def list_personas(db: Session) -> list[Persona]:
    return (
        db.query(Persona)
        .order_by(Persona.fecha_alta.desc(), Persona.id.desc())
        .all()
    )
