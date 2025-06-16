from pydantic import BaseModel, Field
from typing import Optional


class CompanyCreate(BaseModel):
    name: str


class CompanyOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
