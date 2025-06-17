from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user_schema import UserCreate, UserLogin, UserOut, TokenUserResponse
from app.services import user_service
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    new_user = await user_service.create_user(user)
    return new_user


@router.post("/login", response_model=TokenUserResponse)
async def login(user: UserLogin):
    token_data = await user_service.authenticate_user(user)
    return token_data


@router.put("/{user_id}")
async def update(user_id: str, data: dict):
    await user_service.update_user(user_id, data)
    return JSONResponse(content={"message": "User updated successfully"})


@router.delete("/{user_id}")
async def delete(user_id: str):
    await user_service.delete_user(user_id)
    return JSONResponse(content={"message": "User deleted successfully"})
