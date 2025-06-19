from pydantic import BaseModel, Field, EmailStr


class ApplicationCreate(BaseModel):
    userId: str
    companyId: str
    jobLink: str
    resumeLink: str
    email: EmailStr
    phone: str


class ApplicationOut(ApplicationCreate):
    id: str = Field(..., alias="_id")
    submitted: bool

    class Config:
        allow_population_by_field_name = True
