from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
db = client['job_platform']