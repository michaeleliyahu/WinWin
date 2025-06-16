import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")  # תיקון כאן

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
database = client["job_platform"]


def get_database():
    return database
