from fastapi import Form
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ApplicationForm:
    def __init__(
        self,
        firstName: str = Form(...),
        lastName: str = Form(...),
        mobileNumber: str = Form(...),
        email: EmailStr = Form(...),
        jobLink: str = Form(...),
        companyId: str = Form(...),
        userId: str = Form(...)
    ):
        self.firstName = firstName
        self.lastName = lastName
        self.mobileNumber = mobileNumber
        self.email = email
        self.jobLink = jobLink
        self.companyId = companyId
        self.userId = userId


class ApplicationOut(BaseModel):
    id: str = Field(alias="_id")
    firstName: str
    lastName: str
    mobileNumber: str
    email: EmailStr
    jobLink: str
    companyId: str
    userId: str
    resume_file_id: str
    submit: bool
    uploaded_at: datetime


