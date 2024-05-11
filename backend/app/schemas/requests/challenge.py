from typing import List
from pydantic import BaseModel, Field

from ..common import ChallengeModel, CodeChallengeCase, CodeChallengeModel

class CreateCodeChallengeRequest(CodeChallengeModel):
    cases: List[CodeChallengeCase]
    ...

class SubmitCodeChallengeRequest(BaseModel):
    code: str = Field(..., description="The code solution")