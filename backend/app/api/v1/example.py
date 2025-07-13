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

@router.get("/questions")
def list_questions():
    questions_ref = db.collection("Questions").order_by("id")
    docs = questions_ref.stream()
    questions = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id  # include document ID
        questions.append(data)
    return questions


from fastapi.responses import JSONResponse
from fastapi import APIRouter

router = APIRouter()

@router.get("/questions/{qId}")
def get_question_by_step(qId: int):
    questions_ref = db.collection("Questions")
    query = questions_ref.where("order", "==", qId).limit(1)
    docs = query.stream()

    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id  # Attach Firestore document ID for frontend tracking
        return data

    return JSONResponse(status_code=404, content={"message": "Question not found"})









