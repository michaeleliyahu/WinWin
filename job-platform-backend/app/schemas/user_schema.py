from pydantic import BaseModel, EmailStr, Field
from typing import Optional


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
    companyId: Optional[str]


class TokenUserResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut
