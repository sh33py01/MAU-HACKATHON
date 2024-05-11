"""make correct nullable

Revision ID: 90ec64b7c2e4
Revises: 66d578658da3
Create Date: 2024-05-11 03:05:31.859775

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90ec64b7c2e4'
down_revision = '66d578658da3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('challenge_submissions', 'correct',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('challenge_submissions', 'correct',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###
