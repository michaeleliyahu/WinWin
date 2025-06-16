from pydantic import BaseModel, Field


class ApplicationCreate(BaseModel):
    userId: str
    companyId: str
    jobLink: str
    resumeLink: str


class ApplicationOut(ApplicationCreate):
    id: str = Field(alias="_id")
    submitted: bool
