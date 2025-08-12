from bson import ObjectId
from fastapi import HTTPException
from app.db import users_collection

async def get_user_email_by_id(user_id: str) -> str:
    try:
        object_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    user = await users_collection.find_one({"_id": object_id}, {"email": 1})
    if not user or "email" not in user:
        raise HTTPException(status_code=404, detail="User not found")
    return user["email"]