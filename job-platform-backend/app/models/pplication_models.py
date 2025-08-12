from pydantic import BaseModel, EmailStr
from datetime import datetime

class ApplicationSubmitUpdate(BaseModel):
    submit: bool

class Application(BaseModel):
    id: str
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
