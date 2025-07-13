from pydantic import BaseModel
from typing import Any, Union, List

class AnswerSubmission(BaseModel):
    submissionDocId: str
    question_id: str
    selection: List[str]
