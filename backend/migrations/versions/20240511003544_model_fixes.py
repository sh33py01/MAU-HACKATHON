"""model fixes

Revision ID: cd2efdc13f01
Revises: 735cd63e61b2
Create Date: 2024-05-11 00:35:44.680304

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'cd2efdc13f01'
down_revision = '735cd63e61b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('challenges', 'is_completed')
    op.alter_column('code_challenges', 'language',
               existing_type=postgresql.ENUM('C', 'PYTHON3', name='language'),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('code_challenges', 'language',
               existing_type=postgresql.ENUM('C', 'PYTHON3', name='language'),
               nullable=False)
    op.add_column('challenges', sa.Column('is_completed', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
