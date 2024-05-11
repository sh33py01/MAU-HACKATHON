from enum import Enum
from uuid import uuid4

import sqlalchemy
from sqlalchemy import BigInteger, Boolean, Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column

from core.database import Base
from core.database.mixins import TimestampMixin
from core.security.access_control import (
    Allow,
    Authenticated,
    RolePrincipal,
    UserPrincipal,
)
from core.challenge.code import Language


class ChallengePermission(Enum):
    CREATE = "create"
    READ = "read"
    EDIT = "edit"
    DELETE = "delete"


class ChallengeType(str, Enum):
    """ The kind of challenge being performed """
    CHOICE = "choice"
    TEXT = "text"
    CODE = "code"


class Challenge(Base, TimestampMixin):
    __tablename__ = "challenges"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    uuid = Column(UUID(as_uuid=True), default=uuid4, unique=True, nullable=False)
    type = Column(sqlalchemy.Enum(ChallengeType))
    question = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    points = Column(BigInteger, default=0)
    category = Column(String, default="default")

    solved: bool = False

    challenge_author_id = Column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    author = relationship("User", uselist=False, lazy="raise")

    __mapper_args__ = {
        "eager_defaults": True,
        "polymorphic_identity": "challenge",
        "polymorphic_on": "type",
    }

    def __acl__(self):
        basic_permissions = [ChallengePermission.CREATE]
        self_permissions = [
            ChallengePermission.READ,
            ChallengePermission.EDIT,
            ChallengePermission.DELETE,
        ]
        all_permissions = list(ChallengePermission)

        return [
            (Allow, Authenticated, basic_permissions),
            (Allow, UserPrincipal(self.task_author_id), self_permissions),
            (Allow, RolePrincipal("admin"), all_permissions),
        ]


class ChallengeSubmission(Base, TimestampMixin):
    __tablename__ = "challenge_submissions"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    submitter_id = Column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    challenge_id = Column(
        BigInteger, ForeignKey("challenges.id", ondelete="CASCADE"), nullable=False
    )
    correct = Column(Boolean, nullable=True, default=None)


class ChoiceChallenge(Challenge):
    __tablename__ = "choice_challenges"
    id = challenge_author_id = Column(BigInteger, ForeignKey("challenges.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    choice_1: Mapped[str] = mapped_column(String(100))
    choice_2: Mapped[str] = mapped_column(String(100))
    choice_3: Mapped[str] = mapped_column(String(100))
    choice_4: Mapped[str] = mapped_column(String(100))

    __mapper_args__ = {
        "polymorphic_identity": "choice",
    }


class TextChallenge(Challenge):
    __tabelname__ = "text_challenges"
    solution = Column(String(255), nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "text",
    }


class CodeChallenge(Challenge):
    __tablename__ = "code_challenges"
    id = challenge_author_id = Column(BigInteger, ForeignKey("challenges.id", ondelete="CASCADE"), nullable=False, primary_key=True)
    language = Column(sqlalchemy.Enum(Language), nullable=True, default=None)

    cases = relationship(
        "CodeChallengeCase", lazy="raise", passive_deletes=True
    )

    __mapper_args__ = {
        "polymorphic_identity": "code",
    }


class CodeChallengeCase(Base):
    __tablename__ = "challenge_cases"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    challenge_id: Mapped[int] = mapped_column(ForeignKey("code_challenges.id"))
    content: Mapped[str] = mapped_column(String(500))
    answer: Mapped[str] = mapped_column(String(500))