import os
from dotenv import load_dotenv

load_dotenv()

print("DATABASE_URL =", os.getenv("DATABASE_URL"))

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False