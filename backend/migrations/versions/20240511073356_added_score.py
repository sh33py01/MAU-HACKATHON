"""added score

Revision ID: 466f09b66031
Revises: ceff39aeb5fb
Create Date: 2024-05-11 07:33:56.681516

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '466f09b66031'
down_revision = 'ceff39aeb5fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('score', sa.BigInteger(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'score')
    # ### end Alembic commands ###
