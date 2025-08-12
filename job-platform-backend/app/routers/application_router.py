from fastapi import Depends, UploadFile, File, APIRouter, status, HTTPException
from fastapi.responses import StreamingResponse, Response
from app.schemas.application_schema import ApplicationForm
from motor.motor_asyncio import  AsyncIOMotorGridFSBucket
from app.services.application_service import insert_application, get_applications_by_company
from app.db import db
import gridfs 
from bson import ObjectId

fs = AsyncIOMotorGridFSBucket(db)

router = APIRouter(prefix="/application", tags=["application"])

@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def create_application(form: ApplicationForm = Depends(), resume: UploadFile = File(...)):
    await insert_application(form, resume)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/company/{company_id}")
async def applications_for_company(company_id: str):
    return await get_applications_by_company(company_id)

    
@router.get("/resume/{file_id}")
async def download_resume(file_id: str):
    print("Fetching file with ID:", file_id)
    try:
        object_id = ObjectId(file_id)
        print("Parsed ObjectId:", object_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid file ID format")

    try:
        print("Fetching file with ID:", object_id)
        grid_out = await fs.open_download_stream(object_id)
    except gridfs.errors.NoFile:
        raise HTTPException(status_code=404, detail="File not found")

    return StreamingResponse(grid_out, media_type="application/pdf")