from functools import partial
from typing import Callable, Union

from fastapi import APIRouter, Depends, Request

from app.controllers import TaskController
from app.controllers.challenge import ChallengeControllers, CodeChallengeController
from app.models.challenge import ChallengePermission
from app.schemas.requests.challenge import CreateCodeChallengeRequest, SubmitCodeChallengeRequest
from app.schemas.responses.challenge import AnyChallengeResponse, ChallengeResponse, TextChallengeResponse, ChoiceChallengeResponse, CodeChallengeResponse
from app.schemas.common import ChallengeKind
from core.factory import Factory
from core.fastapi.dependencies.authentication import AuthenticationRequired
from core.fastapi.dependencies.permissions import Permissions


challenges_router = APIRouter()


@challenges_router.get("/",
                       response_model=list[AnyChallengeResponse],
                       dependencies=[Depends(AuthenticationRequired)])
async def get_challenges(
    request: Request,
    kind: ChallengeKind = ChallengeKind.CODE,
    assert_access: Callable = Depends(Permissions(ChallengePermission.READ)),
    challenge_controller: ChallengeControllers = Depends(Factory().get_challenge_controller)
) -> list[ChallengeResponse]:
    return await challenge_controller.get_all_on_user(request.user)
    # return await challenge_controller.get_all()


@challenges_router.put("/code",
                       response_model=bool,
                       dependencies=[Depends(AuthenticationRequired)])
async def add_challenge(
    request: Request,
    create: CreateCodeChallengeRequest,
    assert_access: Callable = Depends(Permissions(ChallengePermission.READ)),
    code_challenge_controller: CodeChallengeController = Depends(partial(Factory().get_code_challenge_controller))
) -> list[ChallengeResponse]:
    created = await code_challenge_controller.add({
        "question": create.question,
        "description": create.description,
        "challenge_author_id": request.user.id
    })

    await code_challenge_controller.add_test_cases(created, create.cases)

    return True


@challenges_router.get("/code/{id}",
                       response_model=CodeChallengeResponse,
                       dependencies=[Depends(AuthenticationRequired)])
async def add_challenge(
    request: Request,
    id: int,
    assert_access: Callable = Depends(Permissions(ChallengePermission.READ)),
    code_challenge_controller: CodeChallengeController = Depends(partial(Factory().get_code_challenge_controller))
) -> list[ChallengeResponse]:
    return await code_challenge_controller.get_by_id_on_user(request.user, id)

@challenges_router.post("/code/{id}",
                       response_model=None,
                       dependencies=[Depends(AuthenticationRequired)])
async def submit_code(
    request: Request,
    id: int,
    submit: SubmitCodeChallengeRequest,
    assert_access: Callable = Depends(Permissions(ChallengePermission.READ)),
    code_challenge_controller: CodeChallengeController = Depends(partial(Factory().get_code_challenge_controller))
) -> list[ChallengeResponse]:
    ch = await code_challenge_controller.get_by_id(id)
    await code_challenge_controller.submit(ch, request.user, submit.code)