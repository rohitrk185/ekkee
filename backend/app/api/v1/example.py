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


@router.get("/questions/{stepId}")
def get_question_by_step(stepId: int):
    questions_ref = db.collection("Questions").order_by("id")
    docs = questions_ref.stream()

    count = 0
    for doc in docs:
        count += 1
        if count == stepId:
            data = doc.to_dict()
            data["id"] = doc.id
            return data

    return JSONResponse(status_code=404, content={"message": "Question not found"})





