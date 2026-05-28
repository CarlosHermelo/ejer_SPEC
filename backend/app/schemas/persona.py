from datetime import date
from typing import Annotated

from pydantic import BaseModel, Field, field_validator

RequiredText = Annotated[str, Field(min_length=1, max_length=120)]


class PersonaCreate(BaseModel):
    nombre: RequiredText
    apellido: RequiredText
    fecha_alta: date

    @field_validator("nombre", "apellido")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("El campo no puede estar vacio.")
        return cleaned

    @field_validator("fecha_alta")
    @classmethod
    def validate_fecha_alta(cls, value: date) -> date:
        if value > date.today():
            raise ValueError("La fecha de alta no puede ser futura.")
        return value


class PersonaRead(BaseModel):
    id: str
    nombre: str
    apellido: str
    fecha_alta: date
