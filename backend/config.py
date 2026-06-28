import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    HF_TOKEN = os.getenv("HF_TOKEN")

    UPLOAD_FOLDER = "uploads"