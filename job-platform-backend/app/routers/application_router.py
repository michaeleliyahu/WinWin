from fastapi import Depends, UploadFile, File, APIRouter, status
from fastapi.responses import Response
from app.schemas.application_schema import ApplicationForm
router = APIRouter(prefix="/application", tags=["application"])

@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def create_application(
    form: ApplicationForm = Depends(), 
    resume: UploadFile = File(...) 
):
    

    return Response(status_code=status.HTTP_204_NO_CONTENT)
