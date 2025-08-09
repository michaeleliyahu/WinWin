from openai import files
import requests
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from fastapi import HTTPException
import os

from app.db import db

# יצירת GridFS bucket
fs = AsyncIOMotorGridFSBucket(db)

api_key = os.getenv("N8N_API_KEY")

async def send_to_n8n_from_gridfs(file_id: str, job_url: str) -> str:
    try:
        # שליפת הקובץ מ-GridFS
        file_id_obj = ObjectId(file_id)
        download_stream = await fs.open_download_stream(file_id_obj)
        file_bytes = await download_stream.read()
        filename = download_stream.filename
        content_type = download_stream.metadata.get("contentType") if download_stream.metadata else "application/octet-stream"
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"שגיאה בשליפת קובץ מ-GridFS: {e}")

    # הכנת הבקשה ל-n8n
    files = {
        "resume_file": (filename, file_bytes, content_type)
    }
    data = {
        "job_link": job_url
    }
    try:
        response = requests.post(api_key, files=files, data=data)
        response.raise_for_status()
        return response.text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"שגיאה בשליחת בקשה ל-n8n: {e}")
