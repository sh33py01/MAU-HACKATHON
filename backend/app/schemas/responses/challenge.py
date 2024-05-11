from typing import Union

from ..common import ChallengeModel, TextChallengeModel, CodeChallengeModel, ChoiceChallengeModel


class ChallengeResponse(ChallengeModel):
    ...


class TextChallengeResponse(TextChallengeModel):
    solved: bool
    ...


class CodeChallengeResponse(CodeChallengeModel):
    solved: bool
    ...


class ChoiceChallengeResponse(ChoiceChallengeModel):
    solved: bool
    ...

AnyChallengeResponse = Union[TextChallengeResponse, CodeChallengeResponse, ChoiceChallengeResponse]