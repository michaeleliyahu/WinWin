from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
from app.services.user_service import authenticate_google_user
import requests
import jwt
from datetime import datetime, timedelta
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_google_flow():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=[
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid"
        ],
        redirect_uri=settings.google_redirect_uri
    )
    return flow


@router.get("/google/login")
def login_with_google():
    flow = get_google_flow()
    auth_url, _ = flow.authorization_url(
        prompt='consent',
        access_type='offline',
        include_granted_scopes='true'
    )
    return RedirectResponse(auth_url)


@router.get("/google/callback")
async def google_callback(request: Request):
    import os
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    flow = get_google_flow()
    flow.fetch_token(authorization_response=str(request.url))

    credentials = flow.credentials
    token = credentials.token

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        params={"alt": "json"},
        headers={"Authorization": f"Bearer {token}"}
    ).json()

    result = await authenticate_google_user(user_info)

    jwt_token = result["access_token"]
    redirect_url = f"{settings.frontend_url}/login-success?token={jwt_token}"

    return RedirectResponse(redirect_url)
