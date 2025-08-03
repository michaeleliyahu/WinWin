from fastapi import Depends, UploadFile, File, APIRouter, status
from fastapi.responses import StreamingResponse, Response
from app.schemas.application_schema import ApplicationForm
from motor.motor_asyncio import  AsyncIOMotorGridFSBucket
from app.services.application_service import insert_application, get_applications_by_company
from app.db import db

fs = AsyncIOMotorGridFSBucket(db)

router = APIRouter(prefix="/application", tags=["application"])

@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def create_application(form: ApplicationForm = Depends(), resume: UploadFile = File(...)):
    await insert_application(form, resume)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/applications/company/{company_id}")
async def applications_for_company(company_id: str):
    return await get_applications_by_company(company_id)

    
@router.get("/resume/{file_id}")
async def download_resume(file_id: str):
    grid_out = await fs.open_download_stream(file_id)
    return StreamingResponse(grid_out, media_type="application/octet-stream")