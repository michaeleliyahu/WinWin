from fastapi import FastAPI
from app.routers import user_router, company_router, application_router, auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)
app.include_router(company_router.router)
app.include_router(application_router.router)
app.include_router(auth_router.router)
