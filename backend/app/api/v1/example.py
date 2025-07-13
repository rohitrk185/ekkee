from fastapi import APIRouter, Request
from datetime import datetime
from app.utils.firebase import db
from app.models.answer_submission import AnswerSubmission , Answers
from fastapi.responses import JSONResponse


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

@router.post("/submit/{order_id}")
async def submit_answers(order_id: int, payload: Answers, request: Request):
    try:
        print(payload)
        doc_ref = db.collection("responses").document("all_responses")
        
        
        sub_doc_id = payload.submissionDocId
        question_id = payload.question_id
        selections = payload.selections
        
        sub_doc_ref = db.collection("responses").document(sub_doc_id)
        sub_doc_snap = sub_doc_ref.get()
        
        question_key = f"answers.{question_id}"
        # if sub_doc_snap.exists:
        #     sub_doc_ref.set({
        #         f"{question_key}": selections
        #     })
        # else:
        #     sub_doc_id = db.collection("responses").add({
        #         f"{question_key}": selections
        #     })

        if sub_doc_snap.exists:
            sub_doc_ref.set({
                f"{question_key}": selections
            }, merge=True)  # Optional: merge to preserve existing data
        else:
            _, sub_doc_ref = db.collection("responses").add({
                f"{question_key}": selections
            })
            sub_doc_id = sub_doc_ref.id

            
        # questions_count = db.collection("Questions").count().get()
        questions_ref = db.collection("Questions")
        questions = questions_ref.stream()
        questions_count = sum(1 for _ in questions)

            
        # next_question_data = None
        # if order_id < questions_count:
        #     next_question_snap = db.collection("Questions").where("order", "==", order_id + 1).get()
        #     if next_question_snap.exists:
        #         next_question = next_question_snap.to_dict()
        #         next_question_data = {
        #             "questionId": next_question_snap.id,
        #             "questionTitle": next_question.text,
        #             "description": next_question.instruction,
        #             "isSkippable": next_question.canSkip,
        #             "options": next_question.options,
        #             "isMultiChoice": next_question.isMultiChoice,
        #             "maxSelections": next_question.maxSelections,
        #             "order": next_question.order
        #         }

        next_question_data = None

        if order_id < questions_count:
            next_question_query = db.collection("Questions").where("order", "==", order_id + 1).get()
            
            if next_question_query:  # this checks if the list is not empty
                next_doc = next_question_query[0]  # take the first matched document
                next_question = next_doc.to_dict()
                next_question_data = {
                    "questionId": next_doc.id,
                    "questionTitle": next_question.get("text"),
                    "description": next_question.get("instruction"),
                    "isSkippable": next_question.get("canSkip"),
                    "options": next_question.get("options"),
                    "isMultiChoice": next_question.get("type") == "multi_choice",
                    "maxSelections": next_question.get("maxSelections"),
                    "order": next_question.get("order")
                }
        response ={ 
            "submissionDocumentId": sub_doc_id,
            "next_question": next_question_data
        }

        return response

    except Exception as e:
        print(f"Error submitting response for order {order_id}: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})




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
