from app.db import db
from app.schemas.company_schema import CompanyCreate
from fastapi import HTTPException
from bson import ObjectId

companies_collection = db["companies"]


async def create_company(company: CompanyCreate):
    existing = await companies_collection.find_one({"name": company.name})
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists")

    result = await companies_collection.insert_one(company.dict())
    company_data = company.dict()
    company_data["_id"] = result.inserted_id
    return company_data


async def get_all_companies():
    companies = []
    async for company in companies_collection.find():
        company["_id"] = str(company["_id"])
        companies.append(company)
    return companies


async def delete_company(company_id: str):
    result = await companies_collection.delete_one({"_id": ObjectId(company_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return True
