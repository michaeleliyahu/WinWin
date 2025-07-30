from app.db import db
from app.schemas.company_schema import CompanyCreate
from fastapi import HTTPException
from bson import ObjectId
from .llmService import ask_openai
import json
import requests

companies_collection = db["company"]

agent_instructions = """
## 🎯 Goal
The user provides the name of a company. Your task is to check if the company exists and return relevant profile information.

## ✅ If the company exists, return a JSON object with the following fields:
{
  "name": "<Company Name>",
  "description": "<One-line description (min 50 characters, max 90 characters)>",
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

def get_clearbit_logo(company_name):
    fallback_domain = company_name.replace(" ", "") + ".com"
    logo_url = f"https://logo.clearbit.com/{fallback_domain}"
    return logo_url


async def create_company(company: CompanyCreate):
    print(f"Creating company with data service: {company}")

    existing = await companies_collection.find_one({"name": company.name})
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists")
    
    context = [
        {"role": "system", "content": agent_instructions},
        {"role": "user", "content": company.name}
    ]
    response = await ask_openai(context)
    print(f"OpenAI response: {response}")   

    # Parse the response string to a dict
    try:
        response_data = json.loads(response)
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid response from LLM")

    # Get logo from Clearbit
    logo_url = get_clearbit_logo(company.name)



    result = await companies_collection.insert_one({
        "name": company.name,
        "description": response_data.get("description", ""),
        "industry": response_data.get("industry", ""),
        "category": response_data.get("category", ""),
        "headquarters": response_data.get("headquarters", ""),
        "employees": response_data.get("employees", ""),
        "followers": response_data.get("followers", ""),
        "tagline": response_data.get("tagline", ""),
        "logo": logo_url,
        "users": 1
    })
    response_data["_id"] = str(result.inserted_id)
    return response_data


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
