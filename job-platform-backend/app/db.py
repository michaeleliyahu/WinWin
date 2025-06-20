import motor.motor_asyncio
from app.config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_url)
db = client["job_platform"]   # שנה מ- database ל- db


def get_database():
    return db
