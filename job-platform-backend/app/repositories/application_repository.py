from bson import ObjectId
from pymongo.results import UpdateResult
from fastapi import HTTPException
from app.db import applications_collection

async def update_application_submit(application_id: str, submit_value: bool) -> bool:
    try:
        object_id = ObjectId(application_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid application ID format")
    result: UpdateResult = await applications_collection.update_one(
        {"_id": object_id},
        {"$set": {"submit": submit_value}}
    )
    return result.modified_count > 0

