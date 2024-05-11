from typing import Any, Coroutine, List, Tuple
from app.models import Task
from app.models.user import User
from app.repositories import TaskRepository
from app.repositories.user import UserRepository
from core.controller import BaseController
from core.database.transactional import Propagation, Transactional


class ScoreboardController(BaseController[Task]):
    """Task controller."""
    
    def __init__(self, user_repository: UserRepository):
        super().__init__(model=User, repository=user_repository)
        self.user_repository = user_repository

    async def get_scoreboard(self) -> Coroutine[Any, Any, List[Tuple[str, int]]]:
        results = await self.user_repository.get_all(order = {
            "desc": ["score"],
            "asc": []
        })

        return [
            (result.username, result.score)
            for result in results
        ]