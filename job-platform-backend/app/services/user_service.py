from app.db import db
from app.models.user_model import UserModel
from fastapi import HTTPException
from bson import ObjectId
from app.schemas.user_schema import UserOut, UserCreate, UserLogin
from app.auth.jwt_handler import hash_password, verify_password, create_access_token

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


async def authenticate_google_user(user_info: dict):
    email = user_info.get("email")
    name = user_info.get("name", "")
    google_id = user_info.get("id")

    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    user = await users_collection.find_one({"email": email})

    if user:
        if user.get("authProvider") != "google":
            raise HTTPException(status_code=400, detail="Email already registered with password")
    else:
        first_name = name.split(" ")[0] if name else ""
        last_name = " ".join(name.split(" ")[1:]) if len(name.split(" ")) > 1 else ""

        user_data = {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": None,
            "authProvider": "google",
            "googleId": google_id,
        }
        result = await users_collection.insert_one(user_data)
        user = user_data
        user["_id"] = result.inserted_id

    user["_id"] = str(user["_id"])

    if user.get("companyId"):
        company_doc = await companies_collection.find_one({"_id": ObjectId(user["companyId"])})
        if company_doc:
            company_doc["_id"] = str(company_doc["_id"])
            user["company"] = company_doc

    token = create_access_token({"sub": user["_id"]})
    user_out = UserOut(**user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_out
    }


async def get_user_by_id(user_id: str):
    return await users_collection.find_one({"_id": ObjectId(user_id)})


async def update_user(user_id: str, data: dict):
    result = await users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return True


