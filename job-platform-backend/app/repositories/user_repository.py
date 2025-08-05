from app.db import db
from bson import ObjectId

users_collection = db["users"]

async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})

async def get_user_by_id(user_id: str):
    return await users_collection.find_one({"_id": ObjectId(user_id)})

async def create_user(user_dict: dict):
    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    return user_dict

async def update_user(user_id: str, data: dict):
    result = await users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    return result.matched_count > 0
