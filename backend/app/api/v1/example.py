from fastapi import APIRouter
from app.utils.firebase import db

router = APIRouter()

@router.get("/hello")
def say_hello():
    return {"message": "Hello from API v1!"}

@router.get("/test-firebase")
def test_firebase():
    # Add a test document
    doc_ref = db.collection("test").document("sample")
    doc_ref.set({"hello": "world"})
    # Read it back
    doc = doc_ref.get()
    return doc.to_dict()
