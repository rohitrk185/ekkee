from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "FastAPI App"
    debug: bool = True

settings = Settings()
