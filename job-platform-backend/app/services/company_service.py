from app.db import db
from app.schemas.company_schema import CompanyCreate
from fastapi import HTTPException
from bson import ObjectId
from .llmService import ask_openai

companies_collection = db["company"]

agent_instructions = """
## 🎯 Goal
The user provides the name of a company. Your task is to check if the company exists and return relevant profile information.

## ✅ If the company exists, return a JSON object with the following fields:
{
  "name": "<Company Name>",
  "description": "<One-line description>",
  "industry": "<Industry>",
  "category": "<Product or Service Category>",
  "headquarters": "<City, Country>",
  "employees": "<Estimated number of employees, e.g., '1K–5K'>",
  "followers": "<Approximate follower count, e.g., '340K'>",
  "tagline": "<Short promotional sentence>"
}

## ❌ Rules:
- Do NOT include any explanation or extra text.
- If the company clearly doesn't exist or no reliable information is available, return: { "error": "Company not found or not enough data available." }
- Do NOT hallucinate. Only use real data.

## 📌 Output format:
Return only valid JSON — no markdown, no bullet points, no explanations.
"""

async def create_company(company: str):
    print(f"Creating company with data: {company}")

    existing = await companies_collection.find_one({"name": company})
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists")
    
    context = [{"role": "user", "content": agent_instructions}]
    response = await ask_openai(context)
    print(f"OpenAI response: {response}")   
    return response


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


async def update_company(company_id: str, data: dict):
    result = await companies_collection.update_one(
        {"_id": ObjectId(company_id)},
        {"$set": data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return await companies_collection.find_one({"_id": ObjectId(company_id)})


async def get_company_by_id(company_id: str):
    company = await companies_collection.find_one({"_id": ObjectId(company_id)})
    if company:
        company["_id"] = str(company["_id"])
    return company
