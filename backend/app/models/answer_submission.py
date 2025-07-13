from pydantic import BaseModel
from typing import Dict, Any

class AnswerSubmission(BaseModel):
    answers: Dict[str, Any]
