from app.db import db
from app.schemas.application_schema import ApplicationForm
from fastapi import UploadFile, HTTPException
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from bson import ObjectId
from app.repositories.application_repository import (
    insert_application_document,
    update_application_submit,
    find_applications_by_company,
    find_application_by_id,
)
from app.repositories.email_repository import get_user_email_by_id
from app.services.email_service import send_email
from app.mappers.application_mapper import (
    map_application_document,
    map_application_form_to_document,
)

fs = AsyncIOMotorGridFSBucket(db)

async def insert_application(form: ApplicationForm, resume: UploadFile):
    file_id = await fs.upload_from_stream(
        resume.filename,
        resume.file,
    )
    document = map_application_form_to_document(form, file_id)

    await insert_application_document(document)


async def get_applications_by_company(company_id: str) -> list[dict]:
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    cursor = await find_applications_by_company(company_id, submit=False, since=thirty_days_ago)
    return [map_application_document(doc) async for doc in cursor]


async def submit_application(application_id: str):
    updated = await update_application_submit(application_id, True)
    if not updated:
        raise HTTPException(status_code=404, detail="Application not found or not modified")

    application = await find_application_by_id(application_id, {"userId": 1})
    user_email = await get_user_email_by_id(application["userId"])

    await send_email(
        to_email=user_email,
        subject="Your application has been marked as submitted",
        body="Hello,\n\nYour application status has been updated to submitted.\n\nBest regards,\nJob Platform Team"
    )

    return {"success": True}
