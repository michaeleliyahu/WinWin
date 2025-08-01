from pydantic import BaseModel, Field
from typing import Optional, List


class CompanyCreate(BaseModel):
    name: str


class CompanyOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
    description: Optional[str] = None  # Short description (110–130 chars)
    long_description: Optional[str] = None  # Extended description (200–300 chars)
    industry: Optional[str] = None
    category: Optional[str] = None
    branches_in_israel: Optional[str] = None  # Replaces 'headquarters'
    employees: Optional[str] = None  # e.g., '1K–5K'
    followers: Optional[str] = None  # e.g., '340K'
    tagline: Optional[str] = None
    logo: Optional[str] = None
    users: Optional[int] = None

