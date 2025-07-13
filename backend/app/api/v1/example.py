from fastapi import APIRouter
from fastapi import Request
from datetime import datetime
from app.utils.firebase import db
from app.schemas.answer_submission import AnswerSubmission
from fastapi.responses import JSONResponse

router = APIRouter()

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






@router.post("/submit")
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
