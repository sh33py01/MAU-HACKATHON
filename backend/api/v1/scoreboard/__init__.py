from fastapi import APIRouter
from .scoreboard import scoreboard_router as _scoreboard_router

scoreboard_router = APIRouter()
scoreboard_router.include_router(_scoreboard_router, tags=["Scoreboard"])

__all__ = ["challenges_router"]
