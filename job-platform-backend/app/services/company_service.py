from app.db import db
from app.schemas.company_schema import CompanyCreate
from fastapi import HTTPException
from bson import ObjectId
from .llmService import ask_openai
from ..llm.prompts.searchCompany import agent_instructions
import json
import requests

companies_collection = db["company"]

def get_clearbit_logo(company_name):
    fallback_domain = company_name.replace(" ", "") + ".com"
    logo_url = f"https://logo.clearbit.com/{fallback_domain}"
    return logo_url


async def create_company(company: CompanyCreate):
    context = [
        {"role": "system", "content": agent_instructions},
        {"role": "user", "content": company.name}
    ]
    response = await ask_openai(context)

    try:
        response_data = json.loads(response)
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid response from LLM")

    if "error" in response_data:
        raise HTTPException(status_code=404, detail="Company not found or not enough data available.")

    logo_url = get_clearbit_logo(company.name)

    company_doc = {
        "name": company.name,
        "description": response_data.get("description", ""),
        "long_description": response_data.get("long_description", ""),
        "industry": response_data.get("industry", ""),
        "category": response_data.get("category", ""),
        "branches_in_israel": response_data.get("branches_in_israel", ""),
        "employees": response_data.get("employees", ""),
        "followers": response_data.get("followers", ""),
        "tagline": response_data.get("tagline", ""),
        "logo": logo_url,
        "users": 1
    }

    result = await companies_collection.insert_one(company_doc)
    company_doc["_id"] = str(result.inserted_id)
    return company_doc



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


async def increase_company_user_count(company_id: str):
    result = await companies_collection.update_one(
        {"_id": ObjectId(company_id)},
        {"$inc": {"users": 0}}  # הגדלה בטוחה של השדה
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return await companies_collection.find_one({"_id": ObjectId(company_id)})


async def get_company_by_id(company_id: str):
    company = await companies_collection.find_one({"_id": ObjectId(company_id)})
    if company:
        company["_id"] = str(company["_id"])
    return company
