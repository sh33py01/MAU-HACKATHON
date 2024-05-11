from functools import partial
from typing import Callable, Union, Tuple, List

from fastapi import APIRouter, Depends, Request

from app.controllers.challenge import ChallengeControllers, CodeChallengeController
from app.controllers.scoreboard import ScoreboardController
from app.models.challenge import ChallengePermission
from app.schemas.common import ScoreboardItem
from app.schemas.requests.challenge import CreateCodeChallengeRequest, SubmitCodeChallengeRequest
from app.schemas.responses.challenge import AnyChallengeResponse, ChallengeResponse, TextChallengeResponse, ChoiceChallengeResponse, CodeChallengeResponse
from app.schemas.common import ChallengeKind
from core.factory import Factory
from core.fastapi.dependencies.authentication import AuthenticationRequired
from core.fastapi.dependencies.permissions import Permissions


scoreboard_router = APIRouter()

@scoreboard_router.get("/",
                       response_model=List[ScoreboardItem],
                       dependencies=[Depends(AuthenticationRequired)])
async def get_challenges(
    request: Request,
    assert_access: Callable = Depends(Permissions(ChallengePermission.READ)),
    scoreboard_controller: ScoreboardController = Depends(Factory().get_scoreboard_controller)
) -> list[ChallengeResponse]:
    return [
        ScoreboardItem(username=s[0], score=s[1])
        for s in (await scoreboard_controller.get_scoreboard())
    ]
    # return await challenge_controller.get_all()