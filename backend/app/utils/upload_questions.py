import json
import os
from firebase import db

# Load Questions from JSON file
QUESTIONS_JSON_PATH ="D:\\ekkee\\Questions.json"

with open(QUESTIONS_JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)
    questions = data["Questions"]

# Upload each question as a document in the 'Questions' collection
for question in questions:
    doc_id = str(question["id"])
    db.collection("Questions").document(doc_id).set(question)
    print(f"Uploaded question {doc_id}")

print("All questions uploaded successfully.") 