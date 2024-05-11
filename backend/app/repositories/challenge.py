from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from typing import TypeVar, Generic

from app.models import Challenge, TextChallenge, ChoiceChallenge, CodeChallenge
from core.repository import BaseRepository


ModelType = TypeVar("ModelType", bound=Challenge)

class _ChallengeRepository(Generic[ModelType], BaseRepository[ModelType]):
    """
    Task repository provides all the database operations for the Task model.
    """

    async def get_by_author_id(
        self, author_id: int, join_: set[str] | None = None
    ) -> list[ModelType]:
        """
        Get all challenges by author id.

        :param author_id: The author id to match.
        :param join_: The joins to make.
        :return: A list of tasks.
        """
        query = await self._query(join_)
        query = await self._get_by(query, "task_author_id", author_id)

        if join_ is not None:
            return await self.all_unique(query)

        return await self._all(query)

    def _join_author(self, query: Select) -> Select:
        """
        Join the author relationship.

        :param query: The query to join.
        :return: The joined query.
        """
        return query.options(joinedload(self.model_class.author))


class ChallengeRepository(_ChallengeRepository[Challenge]):
    ...


class TextChallengeRepository(_ChallengeRepository[TextChallenge]):
    ...


class ChoiceChallengeRepository(_ChallengeRepository[ChoiceChallenge]):
    ...


class CodeChallengeRepository(_ChallengeRepository[CodeChallenge]):
    def _join_cases(self, query: Select) -> Select:
        """
        Join the cases relationship.

        :param query: The query to join.
        :return: The joined query.
        """
        return query.options(joinedload(CodeChallenge.cases))