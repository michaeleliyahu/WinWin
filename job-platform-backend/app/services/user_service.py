from app.db import db
from app.auth.jwt_handler import hash_password, verify_password, create_access_token
from app.schemas.user_schema import UserCreate, UserLogin, UserOut
from fastapi import HTTPException
from bson import ObjectId

users_collection = db["users"]
companies_collection = db["company"]


async def create_user(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pwd
    user_dict["authProvider"] = "local"
    user_dict["googleId"] = None
    user_dict["companyId"] = None

    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)

    # מחיקה של הסיסמה מהתגובה
    user_dict.pop("password")

    user_data = UserOut(**user_dict)

    token = create_access_token({"sub": user_dict["_id"]})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }


async def authenticate_user(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user["_id"])})

    db_user["_id"] = str(db_user["_id"])

    # שליפת החברה והוספתה לאובייקט
    company = None
    if db_user.get("companyId"):
        company_doc = await companies_collection.find_one({"_id": ObjectId(db_user["companyId"])})
        if company_doc:
            company_doc["_id"] = str(company_doc["_id"])
            db_user["company"] = company_doc

    user_data = UserOut(**db_user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }


async def get_user_by_id(user_id: str):
    return await users_collection.find_one({"_id": ObjectId(user_id)})


async def update_user(user_id: str, data: dict):
    result = await users_collection.update_one(
        {"_id": ObjectId(user_id)}, {"$set": data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return True


async def delete_user(user_id: str):
    result = await users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return True
