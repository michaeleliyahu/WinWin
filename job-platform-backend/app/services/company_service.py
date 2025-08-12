from app.db import db
from app.schemas.company_schema import CompanyCreate
from fastapi import HTTPException
from .llmService import ask_openai
from ..llm.prompts.searchCompany import agent_instructions
import json
from app.mappers.company_mapper import map_company_to_document
from app.repositories.company_repository import (
    insert_company,
    find_all_companies,
    delete_company_by_id,
    increment_company_users,
    find_company_by_id,
)

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

    company_doc = map_company_to_document(company, response_data, logo_url)

    inserted_id = await insert_company(company_doc)
    company_doc["_id"] = inserted_id
    return company_doc

async def get_all_companies():
    companies = []
    async for company in await find_all_companies():
        company["_id"] = str(company["_id"])
        companies.append(company)
    return companies


async def delete_company(company_id: str):
    deleted = await delete_company_by_id(company_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Company not found")
    return True


async def increase_company_user_count(company_id: str):
    updated = await increment_company_users(company_id, amount=0)
    if not updated:
        raise HTTPException(status_code=404, detail="Company not found")
    return await find_company_by_id(company_id)


async def get_company_by_id(company_id: str):
    company = await find_company_by_id(company_id)
    if company:
        company["_id"] = str(company["_id"])
    return company
