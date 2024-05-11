from enum import Enum
from typing import List, Dict, Optional

from pydantic import BaseModel
from pydantic import UUID4, BaseModel, Field

class ChallengeKind(Enum):
    TEXT = "text"
    CHOICE = "choice"
    CODE = "code"


class ChallengeModel(BaseModel):
    id: Optional[int] = None
    question: str = Field(
        ..., description="Question of challenge", example="What is 1 + 1 ?"
    )
    description: str = Field(
        ..., description="Task description", example="Task 1 description"
    )
    # uuid: UUID4 = Field(
    #     ..., description="Task UUID", example="a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    # )

    class Config:
        orm_mode = True

class TextChallengeModel(ChallengeModel):
    answer: str = Field(..., description="Challenge answer")


class ChoiceChallengeModel(ChallengeModel):
    choices: List[str] = Field(..., description="List of choices")


class ChoiceChallengeModel(ChallengeModel):
    choices: List[str] = Field(..., description="List of choices")


class CodeChallengeCase(BaseModel):
    content: str
    answer: str
    class Config:
        orm_mode = True


class CodeChallengeModel(ChallengeModel):
    ...
    # code: str = Field(..., description="The code submission to the challenge")