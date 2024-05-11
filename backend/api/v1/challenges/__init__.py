from fastapi import APIRouter

from .challenges import challenges_router as _challenges_router

challenges_router = APIRouter()
challenges_router.include_router(_challenges_router, tags=["Challenges"])

__all__ = ["challenges_router"]
