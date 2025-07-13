from pydantic import BaseModel
from typing import Dict, Any

from typing import List, Optional


class AnswerSubmission(BaseModel):
    answers: List[str]



class Answers(BaseModel):
    selections: List[str]
    submissionDocId: Optional[str] = None
    question_id: str
