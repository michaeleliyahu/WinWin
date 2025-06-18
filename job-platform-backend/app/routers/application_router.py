from fastapi import APIRouter
from app.schemas.application_schema import ApplicationCreate, ApplicationOut
from app.services import application_service
from fastapi.responses import JSONResponse
from typing import List
from fastapi import APIRouter, Query
from fastapi import Path

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/", response_model=ApplicationOut)
async def create_application(app: ApplicationCreate):
    new_app = await application_service.create_application(app)
    return new_app


@router.get("/by-company", response_model=List[ApplicationOut])
async def get_applications_by_company(companyId: str = Query(...)):
    return await application_service.get_applications_by_company(companyId)


@router.patch("/{application_id}/submit")
async def submit_application(application_id: str = Path(...)):
    updated_app = await application_service.update_application_submitted(application_id)
    if not updated_app:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application submitted successfully", "application": updated_app}


@router.delete("/{application_id}")
async def delete_application(application_id: str):
    await application_service.delete_application(application_id)
    return JSONResponse(content={"message": "Application deleted successfully"})
