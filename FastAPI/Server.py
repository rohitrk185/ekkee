from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Literal
from pydantic import BaseModel, field_validator
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# --- App Setup ---
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Firebase Initialization ---
load_dotenv()
firebase_cred_env = os.environ.get("FIREBASE_CRED")
CRED_PATH = firebase_cred_env if firebase_cred_env and os.path.exists(firebase_cred_env) else "credentials.json"

if not firebase_admin._apps:
    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()

# --- Models ---
class Option(BaseModel):
    label: str
    icon: Optional[str] = None

class Question(BaseModel):
    type: Literal["single_choice", "multi_choice"]
    text: str
    canSkip: bool
    options: List[Option]
    maxSelections: Optional[int] = None

    @field_validator("maxSelections")
    @classmethod
    def check_max_selections(cls, max_sel, info):
        if info.data.get("type") == "multi_choice" and max_sel is None:
            raise ValueError("maxSelections is required for multi_choice questions")
        return max_sel

class AnswerSubmission(BaseModel):
    answers: dict[str, List[str]]  # question_id -> list of selected option labels

# --- Routes ---

# Add a new question
@app.post("/questions")
async def add_question(q: Question):
    data = q.model_dump()
    doc_ref = db.collection("questions").add(data)
    return {"message": "Question added", "id": doc_ref[1].id}

# Get all questions (ordered)
@app.get("/questions")
async def get_questions():
    docs = db.collection("questions2").order_by("order").stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]

# Submit user answers
@app.post("/submit")
async def submit_answers(payload: AnswerSubmission, request: Request):
    try:
        db.collection("responses").add({
            "answers": payload.answers,
            "submittedAt": datetime.utcnow(),
            "clientIp": request.client.host
        })
        return {"message": "Answers submitted successfully"}
    except Exception as e:
        return {"error": str(e)}
