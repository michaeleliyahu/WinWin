from bson import ObjectId
from fastapi import HTTPException
from typing import Optional, Iterable
from app.db import companies_collection


def _parse_object_id(id_str: str) -> ObjectId:
	try:
		return ObjectId(id_str)
	except Exception:
		raise HTTPException(status_code=400, detail="Invalid company ID format")


async def insert_company(document: dict) -> str:
	result = await companies_collection.insert_one(document)
	return str(result.inserted_id)


async def find_all_companies() -> Iterable[dict]:
	return companies_collection.find()


async def delete_company_by_id(company_id: str) -> bool:
	oid = _parse_object_id(company_id)
	result = await companies_collection.delete_one({"_id": oid})
	return result.deleted_count == 1


async def increment_company_users(company_id: str, amount: int = 1) -> bool:
	oid = _parse_object_id(company_id)
	result = await companies_collection.update_one({"_id": oid}, {"$inc": {"users": amount}})
	return result.matched_count == 1


async def find_company_by_id(company_id: str, projection: Optional[dict] = None) -> Optional[dict]:
	oid = _parse_object_id(company_id)
	return await companies_collection.find_one({"_id": oid}, projection)
