from fastapi import FastAPI
from app.routers import user_router, company_router, application_router

app = FastAPI()

app.include_router(user_router.router)
app.include_router(company_router.router)
app.include_router(application_router.router)
