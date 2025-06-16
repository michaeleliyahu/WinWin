from fastapi import APIRouter
from app.schemas.application_schema import ApplicationCreate, ApplicationOut
from app.services import application_service
from fastapi.responses import JSONResponse
from typing import List

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/", response_model=ApplicationOut)
async def create_application(app: ApplicationCreate):
    new_app = await application_service.create_application(app)
    return new_app


@router.get("/", response_model=List[ApplicationOut])
async def get_applications():
    return await application_service.get_all_applications()


@router.put("/{application_id}/submit")
async def mark_submitted(application_id: str):
    await application_service.mark_as_submitted(application_id)
    return JSONResponse(content={"message": "Application marked as submitted"})


@router.delete("/{application_id}")
async def delete_application(application_id: str):
    await application_service.delete_application(application_id)
    return JSONResponse(content={"message": "Application deleted successfully"})
