from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from .company_schema import CompanyOut


class UserCreate(BaseModel):
    fullName: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str = Field(alias="_id")
    fullName: str
    email: EmailStr
    authProvider: str
    googleId: Optional[str] = None
    companyId: Optional[str] = None
    picture: Optional[str] = None

class TokenUserResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class UserUpdate(BaseModel):
    companyId: Optional[str] = Field(None, alias="companyId")