from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongodb_url: str
    secret_key: str
    opencorporates_api_token: str

    class Config:
        env_file = ".env"


settings = Settings()
