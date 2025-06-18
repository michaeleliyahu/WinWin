from app.db import db
from app.schemas.application_schema import ApplicationCreate
from fastapi import HTTPException
from bson import ObjectId
from fastapi import Path

applications_collection = db["applications"]


async def create_application(app_create: ApplicationCreate):
    app_dict = app_create.dict()
    app_dict["submitted"] = False
    result = await applications_collection.insert_one(app_dict)
    new_app = await applications_collection.find_one({"_id": result.inserted_id})

    new_app["_id"] = str(new_app["_id"])

    return new_app


async def get_applications_by_company(company_id: str):
    cursor = applications_collection.find({"companyId": company_id})
    results = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        results.append(doc)
    return results


async def update_application_submitted(application_id: str):
    result = await applications_collection.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {"submitted": True}}
    )
    if result.modified_count == 0:
        return None
    updated_app = await applications_collection.find_one({"_id": ObjectId(application_id)})
    updated_app["_id"] = str(updated_app["_id"])
    return updated_app


async def delete_application(application_id: str):
    result = await applications_collection.delete_one({"_id": ObjectId(application_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return True
