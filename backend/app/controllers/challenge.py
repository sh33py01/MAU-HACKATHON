from typing import Any, Coroutine, TypeVar, Generic, Union, Dict, List, Optional

from sqlalchemy import select

from app.models import Challenge, CodeChallenge, TextChallenge, ChoiceChallenge
from app.models.challenge import ChallengeSubmission, CodeChallengeCase
from app.models.user import User
from app.repositories import TaskRepository
from core.controller import BaseController
from core.database.transactional import Propagation, Transactional


ChallengeVar = TypeVar("ChallengeVar", bound=Challenge)

class _ChallengeController(BaseController[ChallengeVar]):
    """Task controller."""

    def __init__(self, challenge_repository: TaskRepository):
        super().__init__(model=Challenge, repository=challenge_repository)
        self.challenge_repository = challenge_repository

    async def get_by_author_id(self, author_id: int) -> list[ChallengeVar]:
        """
        Returns a list of tasks based on author_id.

        :param author_id: The author id.
        :return: A list of tasks.
        """

        return await self.challenge_repository.get_by_author_id(author_id)

    @Transactional(propagation=Propagation.REQUIRED)
    async def add(self, d: dict) -> ChallengeVar:
        """
        Adds a task.

        :param title: The task title.
        :param description: The task description.
        :param author_id: The author id.
        :return: The task.
        """

        return await self.challenge_repository.create(
            d
        )
    
    async def get_all_on_user(self, user: User, skip: int = 0, limit: int = 100, join_: set[str] | None = None) -> Coroutine[Any, Any, List[CodeChallenge]]:
        """ Get all challenges and whether solved by user """
        result = await super().get_all(skip, limit, join_)

        for ch in result:
            ch.solved = await self.solved_by(ch, user)
        return result
    
    async def get_by_id_on_user(self, user: User, id_: int, join_: set[str] | None = None) -> Coroutine[Any, Any, ChallengeVar]:
        """ Get by id and whether solved by user """
        result = await super().get_by_id(id_, join_)
        result.solved = await self.solved_by(result, user)
        return result
    
    async def solved_by(self, ch: Challenge, user: User) -> Coroutine[Any, Any, bool]:
        return (await self.repository.session.scalar(
            select(ChallengeSubmission).where((ChallengeSubmission.challenge_id == ch.id) 
                                                & (ChallengeSubmission.submitter_id == user.id)
                                                & (ChallengeSubmission.correct == True)))) != None

    @Transactional(propagation=Propagation.REQUIRED)
    async def submit(self, ch: Challenge, user: User, correct: Optional[bool]):
        self.repository.session.add(
            ChallengeSubmission(
                challenge_id = ch.id,
                submitter_id = user.id,
                correct = correct
            )
        )


class TextChallengeController(_ChallengeController[TextChallenge]):
    ...


class ChoiceChallengeController(_ChallengeController[ChoiceChallenge]):
    ...


class CodeChallengeController(_ChallengeController[CodeChallenge]):
    
    def submit(self, ch: Challenge, user: User, code: str ):
        return super().submit(ch, user, code == "bazinga")

    @Transactional(propagation=Propagation.REQUIRED)
    async def add_test_cases(self, code_challenge: CodeChallenge, cases: List[CodeChallengeCase]) -> List[CodeChallengeCase]:
        models = [
            CodeChallengeCase(
                challenge_id = code_challenge.id,
                content = case.content,
                answer = case.answer
            ) for case in cases
        ]

        for m in models:
            self.repository.session.add(m)
        
        return models


ChallengeControllers = Union[TextChallengeController, ChoiceChallengeController, CodeChallengeController]