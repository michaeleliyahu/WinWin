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
    googleId: Optional[str] = None
    companyId: Optional[str] = None
    company: Optional[CompanyOut] = None


class TokenUserResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class UserUpdate(BaseModel):
    # name: Optional[str]
    # email: Optional[str]
    companyId: Optional[str] = Field(None, alias="companyId")