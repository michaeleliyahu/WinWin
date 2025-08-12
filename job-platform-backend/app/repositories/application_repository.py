from bson import ObjectId
from pymongo.results import UpdateResult, InsertOneResult
from fastapi import HTTPException
from datetime import datetime
from app.db import applications_collection
from typing import Optional, Iterable


def _parse_object_id(id_str: str) -> ObjectId:
    try:
        return ObjectId(id_str)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid application ID format")


async def insert_application_document(document: dict) -> str:
    result: InsertOneResult = await applications_collection.insert_one(document)
    return str(result.inserted_id)


async def update_application_submit(application_id: str, submit_value: bool) -> bool:
    object_id = _parse_object_id(application_id)
    result: UpdateResult = await applications_collection.update_one(
        {"_id": object_id}, {"$set": {"submit": submit_value}}
    )
    return result.modified_count > 0


async def find_applications_by_company(company_id: str, submit: Optional[bool], since: datetime) -> Iterable[dict]:
    query: dict = {"companyId": company_id, "uploaded_at": {"$gte": since}}
    if submit is not None:
        query["submit"] = submit
    return applications_collection.find(query)


async def find_application_by_id(application_id: str, projection: Optional[dict] = None) -> Optional[dict]:
    object_id = _parse_object_id(application_id)
    return await applications_collection.find_one({"_id": object_id}, projection)

