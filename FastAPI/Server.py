from typing import List, Optional, Literal
from pydantic import BaseModel, model_validator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore

app = FastAPI()

# CORS (use '*' for dev; restrict in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Firebase init
cred = credentials.Certificate("credentials.json")
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

    @model_validator(mode="after")
    def validate_max_selections(cls, values):
        q_type = values.get("type")
        max_sel = values.get("maxSelections")
        if q_type == "multi_choice" and max_sel is None:
            raise ValueError("maxSelections is required for multi_choice questions")
        return values

# --- Routes ---
@app.post("/questions")
async def add_question(q: Question):
    doc_ref = db.collection("questions").add(q.dict())
    return {"message": "Question added", "id": doc_ref[1].id}

@app.get("/questions")
async def get_questions():
    docs = db.collection("questions").stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]
