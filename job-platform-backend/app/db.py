import motor.motor_asyncio
from app.config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_url)
db = client["job_platform"]

users_collection = db["users"]
companies_collection = db["companies"]


def get_database():
    return db
