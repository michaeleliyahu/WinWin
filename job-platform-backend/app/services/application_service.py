from app.db import db
from app.schemas.application_schema import ApplicationForm
from fastapi import UploadFile
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket

fs = AsyncIOMotorGridFSBucket(db)

applications_collection = db["applications"]

async def insert_application(form: ApplicationForm, resume: UploadFile):
    # שמירת הקובץ ב-GridFS
    file_id = await fs.upload_from_stream(
        resume.filename,
        resume.file  # resume.file הוא ה-BufferedReader של UploadFile
    )

    document = {
        "firstName": form.firstName,
        "lastName": form.lastName,
        "mobileNumber": form.mobileNumber,
        "email": form.email,
        "jobLink": form.jobLink,
        "companyId": form.companyId,
        "userId": form.userId,
        "resume_file_id": file_id,  # שומר את מזהה הקובץ ב-GridFS
        "uploaded_at": datetime.utcnow()
    }

    await applications_collection.insert_one(document)


async def get_applications_by_company(company_id: str) -> list[dict]:
    cursor = applications_collection.find({"companyId": company_id})
    applications = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])  # הפוך את ObjectId למחרוזת
        doc["resume_file_id"] = str(doc["resume_file_id"])
        applications.append(doc)
    return applications