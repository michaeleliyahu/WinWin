from fastapi import APIRouter, Form, UploadFile, File, Query, Path
from fastapi.responses import JSONResponse
from typing import Annotated, List
from pydantic import EmailStr

from app.schemas.application_schema import ApplicationCreate, ApplicationOut
from app.services import application_service


router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/", response_model=ApplicationOut)
async def create_application(
        userId: Annotated[str, Form()],
        companyId: Annotated[str, Form()],
        jobLink: Annotated[str, Form()],
        resume: Annotated[UploadFile, File()],
        email: Annotated[EmailStr, Form()],
        phone: Annotated[str, Form()],
):
    contents = await resume.read()

    app_data = {
        "userId": userId,
        "companyId": companyId,
        "jobLink": jobLink,
        "resumeLink": resume.filename,
        "email": email,
        "phone": phone,
    }

    app_create = ApplicationCreate(**app_data)

    new_app = await application_service.create_application(app_create)
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
