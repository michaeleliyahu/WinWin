from pydantic import BaseModel, Field
from typing import Optional


class CompanyCreate(BaseModel):
    name: str


class CompanyOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
    description: Optional[str] = None
    industry: Optional[str] = None
    category: Optional[str] = None
    headquarters: Optional[str] = None
    employees: Optional[str] = None
    followers: Optional[str] = None
    tagline: Optional[str] = None
    logo: Optional[str] = None
    users: Optional[int] = None

