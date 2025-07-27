from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    mongodb_url: str = Field(..., env="MONGODB_URL")
    google_client_id: str = Field(..., env="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., env="GOOGLE_CLIENT_SECRET")
    google_redirect_uri: str = Field(..., env="GOOGLE_REDIRECT_URI")
    jwt_secret: str = Field(..., env="JWT_SECRET")
    openAi_api_key: str = Field(..., env="OPENAI_API_KEY")


    class Config:
        env_file = ".env"
        extra = "forbid"


settings = Settings()
print("JWT Secret:", settings.jwt_secret)