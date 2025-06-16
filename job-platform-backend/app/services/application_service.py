from app.db import db
from app.schemas.application_schema import ApplicationCreate
from fastapi import HTTPException
from bson import ObjectId

applications_collection = db["applications"]


async def create_application(app_data: ApplicationCreate):
    app_dict = app_data.dict()
    app_dict["submitted"] = False
    result = await applications_collection.insert_one(app_dict)
    app_dict["_id"] = result.inserted_id
    return app_dict


async def get_all_applications():
    apps = []
    async for app in applications_collection.find():
        app["_id"] = str(app["_id"])
        apps.append(app)
    return apps


async def mark_as_submitted(application_id: str):
    result = await applications_collection.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {"submitted": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Application not found or already submitted")
    return True


async def delete_application(application_id: str):
    result = await applications_collection.delete_one({"_id": ObjectId(application_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return True
