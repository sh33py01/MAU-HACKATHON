"""add challenges

Revision ID: 735cd63e61b2
Revises: cabcbd0d8153
Create Date: 2024-05-10 21:29:49.175646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '735cd63e61b2'
down_revision = 'cabcbd0d8153'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('challenges',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('uuid', sa.UUID(), nullable=False),
    sa.Column('type', sa.Enum('CHOICE', 'TEXT', 'CODE', name='challengetype'), nullable=True),
    sa.Column('question', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('is_completed', sa.Boolean(), nullable=False),
    sa.Column('challenge_author_id', sa.BigInteger(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('solution', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['challenge_author_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uuid')
    )
    op.create_table('choice_challenges',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('choice_1', sa.String(length=100), nullable=False),
    sa.Column('choice_2', sa.String(length=100), nullable=False),
    sa.Column('choice_3', sa.String(length=100), nullable=False),
    sa.Column('choice_4', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['challenges.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('code_challenges',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('language', sa.Enum('C', 'PYTHON3', name='language'), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['challenges.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('challenge_cases',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('challenge_id', sa.BigInteger(), nullable=False),
    sa.Column('content', sa.String(length=500), nullable=False),
    sa.Column('answer', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['challenge_id'], ['code_challenges.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('tasks_task_author_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'users', ['task_author_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.create_foreign_key('tasks_task_author_id_fkey', 'tasks', 'users', ['task_author_id'], ['id'])
    op.drop_table('challenge_cases')
    op.drop_table('code_challenges')
    op.drop_table('choice_challenges')
    op.drop_table('challenges')
    # ### end Alembic commands ###