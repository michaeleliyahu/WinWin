from app.db import db
from app.schemas.application_schema import ApplicationForm
from fastapi import UploadFile, HTTPException
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from app.db import applications_collection
from bson import ObjectId
from app.repositories.application_repository import update_application_submit
from app.repositories.email_repository import get_user_email_by_id
from app.services.email_service import send_email

fs = AsyncIOMotorGridFSBucket(db)

async def insert_application(form: ApplicationForm, resume: UploadFile):
    file_id = await fs.upload_from_stream(
        resume.filename,
        resume.file,
    )
    document = {
        "firstName": form.firstName,
        "lastName": form.lastName,
        "mobileNumber": form.mobileNumber,
        "email": form.email,
        "jobLink": form.jobLink,
        "companyId": form.companyId,
        "userId": form.userId,
        "resume_file_id": file_id,
        "submit": False,
        "uploaded_at": datetime.utcnow()
    }

    await applications_collection.insert_one(document)

async def get_applications_by_company(company_id: str) -> list[dict]:
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    cursor = applications_collection.find({
        "companyId": company_id,
        "submit": False,
        "uploaded_at": {"$gte": thirty_days_ago}
    })
    applications: list[dict] = []
    async for doc in cursor:
        first = doc.get("firstName", "")
        last = doc.get("lastName", "")
        name = f"{first} {last}".strip()
        applications.append({
            "id": str(doc.get("_id")),
            "name": name,
            "role": doc.get("jobLink") or "N/A",
            "submittedTime": doc.get("uploaded_at").isoformat() if doc.get("uploaded_at") else None,
            "fileType": "PDF",  # TODO: derive from stored metadata if available
            "fileSize": "—",     # TODO: compute from GridFS file length if needed
            "isHandled": doc.get("submit", False),
            "avatar": (first[:1] + last[:1]) if first or last else "??",
            "fileId": str(doc.get("resume_file_id")),
        })
    return applications

async def submit_application(application_id: str):
    updated = await update_application_submit(application_id, True)
    print(f"Application {application_id} updated: {updated}")
    if not updated:
        raise HTTPException(status_code=404, detail="Application not found or not modified")

    application = await applications_collection.find_one(
        {"_id": ObjectId(application_id)},
        {"userId": 1}
    )
    if not application or "userId" not in application:
        raise HTTPException(status_code=404, detail="User ID not found for application")

    user_email = await get_user_email_by_id(application["userId"])

    await send_email(
        to_email=user_email,
        subject="Your application has been marked as submitted",
        body="Hello,\n\nYour application status has been updated to submitted.\n\nBest regards,\nJob Platform Team"
    )

    return {"success": True}
