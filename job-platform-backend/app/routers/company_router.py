from fastapi import APIRouter
from app.schemas.company_schema import CompanyCreate, CompanyOut
from app.services import company_service
from fastapi.responses import JSONResponse
from typing import List
from fastapi import Body
from fastapi import Path

router = APIRouter(prefix="/companies", tags=["companies"])


@router.post("/", response_model=CompanyOut)
async def create_company(company: CompanyCreate):
    new_company = await company_service.create_company(company)
    return new_company


@router.get("/", response_model=List[CompanyOut])
async def get_companies():
    return await company_service.get_all_companies()


@router.delete("/{company_id}")
async def delete_company(company_id: str):
    await company_service.delete_company(company_id)
    return JSONResponse(content={"message": "Company deleted successfully"})


@router.put("/{company_id}")
async def update_company(company_id: str = Path(...), data: dict = None):
    updated = await company_service.update_company(company_id, data)
    updated["_id"] = str(updated["_id"])
    return updated

@router.get("/{company_id}", response_model=CompanyOut)
async def get_company(company_id: str):
    company = await company_service.get_company_by_id(company_id)
    if not company:
        return JSONResponse(status_code=404, content={"detail": "Company not found"})
    return company
