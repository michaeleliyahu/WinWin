from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user_schema import UserCreate,UserUpdate, UserLogin, UserOut, TokenUserResponse
from app.services import user_service
from fastapi.responses import JSONResponse
from fastapi import Path
from app.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register", response_model=TokenUserResponse)
async def register(user: UserCreate):
    return await user_service.create_user(user)


@router.post("/login", response_model=TokenUserResponse)
async def login(user: UserLogin):
    token_data = await user_service.authenticate_user(user)
    return token_data


@router.put("/updateUserCompany/{id}")
async def updateUserCompany(id: str, data: UserUpdate, current_user: TokenUserResponse = Depends(get_current_user)):

    if id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only update your own profile.")
    
    await user_service.updateUserCompany(id, data.dict(exclude_unset=True))
    return JSONResponse(content={"message": "User updated successfully"})

@router.get("/me")
async def get_current_user_data(user: UserOut = Depends(get_current_user)):
    return user