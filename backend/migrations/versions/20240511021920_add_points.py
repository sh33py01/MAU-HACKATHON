"""add points

Revision ID: 66d578658da3
Revises: 7133a9bf1966
Create Date: 2024-05-11 02:19:20.808693

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66d578658da3'
down_revision = '7133a9bf1966'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('challenge_submissions',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('submitter_id', sa.BigInteger(), nullable=False),
    sa.Column('challenge_id', sa.BigInteger(), nullable=False),
    sa.Column('correct', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['challenge_id'], ['challenges.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['submitter_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('challenges', sa.Column('points', sa.BigInteger(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('challenges', 'points')
    op.drop_table('challenge_submissions')
    # ### end Alembic commands ###