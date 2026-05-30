from fastapi import APIRouter
from pydantic import BaseModel, field_validator

from app.services.whatsapp_service import send_message

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])


class SendMessageRequest(BaseModel):
    message: str

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("El mensaje no puede estar vacío")
        return v


@router.post("/send")
def send_whatsapp(body: SendMessageRequest) -> dict:
    return send_message(body.message)
