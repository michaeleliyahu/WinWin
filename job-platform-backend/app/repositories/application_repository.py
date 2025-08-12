from bson import ObjectId
from pymongo.results import UpdateResult
from fastapi import HTTPException
from app.db import applications_collection

async def update_application_submit(application_id: str, submit_value: bool) -> bool:
    try:
        object_id = ObjectId(application_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid application ID format")
    print(f"Updating application {application_id} to submitted: {submit_value}")
    result: UpdateResult = await applications_collection.update_one(
        {"_id": object_id},
        {"$set": {"submit": submit_value}}
    )
    print(f"Update result: {result.modified_count} document(s) modified")
    return result.modified_count > 0

