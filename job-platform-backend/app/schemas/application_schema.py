from fastapi import Form
from pydantic import EmailStr
from typing import Annotated

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
