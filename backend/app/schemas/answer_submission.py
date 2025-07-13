from pydantic import BaseModel
from typing import Any, List

class AnswerSubmission(BaseModel):
    answers: List[Any] 