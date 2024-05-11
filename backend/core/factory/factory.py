from functools import partial

from fastapi import Depends

from app.controllers import AuthController, TaskController, UserController
from app.controllers.challenge import ChoiceChallengeController, CodeChallengeController, TextChallengeController
from app.controllers.scoreboard import ScoreboardController
from app.models import Task, User
from app.models.challenge import ChoiceChallenge, CodeChallenge, TextChallenge
from app.repositories import TaskRepository, UserRepository
from app.repositories.challenge import ChoiceChallengeRepository, CodeChallengeRepository, TextChallengeRepository
from app.schemas.common import ChallengeKind
from core.database import get_session
from tests.conftest import db_session


class Factory:
    """
    This is the factory container that will instantiate all the controllers and
    repositories which can be accessed by the rest of the application.
    """

    # Repositories
    task_repository = partial(TaskRepository, Task)
    user_repository = partial(UserRepository, User)
    
    # Challenges
    text_challenge_repository = partial(TextChallengeRepository, TextChallenge)
    choice_challenge_repository = partial(ChoiceChallengeRepository, ChoiceChallenge)
    code_challenge_repository = partial(CodeChallengeRepository, CodeChallenge)

    def get_user_controller(self, db_session=Depends(get_session)):
        return UserController(
            user_repository=self.user_repository(db_session=db_session)
        )

    def get_task_controller(self, db_session=Depends(get_session)):
        return TaskController(
            task_repository=self.task_repository(db_session=db_session)
        )

    def get_auth_controller(self, db_session=Depends(get_session)):
        return AuthController(
            user_repository=self.user_repository(db_session=db_session),
        )
    
    def get_code_challenge_controller(self, db_session=Depends(get_session)):
        return CodeChallengeController(
            challenge_repository=self.code_challenge_repository(db_session=db_session)
        )


    def get_challenge_controller(self, kind: ChallengeKind, db_session=Depends(get_session)):
        match kind:
            case ChallengeKind.TEXT:
                return TextChallengeController(
                    challenge_repository=self.text_challenge_repository(db_session=db_session)
                )
            case ChallengeKind.CHOICE:
                return ChoiceChallengeController(
                    challenge_repository=self.choice_challenge_repository(db_session=db_session)
                )
            case ChallengeKind.CODE:
                return self.get_code_challenge_controller(db_session)
            case _ as k:
                raise ValueError(f"Unsupported ChallengeKind {k}")
    
    def get_scoreboard_controller(self, db_session=Depends(get_session)):
        return ScoreboardController(
            user_repository=self.user_repository(db_session=db_session)
        )
