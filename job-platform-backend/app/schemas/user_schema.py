from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from .company_schema import CompanyOut


class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str = Field(alias="_id")
    firstName: str
    lastName: str
    email: EmailStr
    authProvider: str
    googleId: Optional[str]
    company: Optional[CompanyOut] = None  # 👈 אובייקט חברה מקונן


class TokenUserResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut
