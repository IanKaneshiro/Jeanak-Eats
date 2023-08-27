"""created order_menu_items table

Revision ID: aacad3289d3f
Revises: 68e28301eed8
Create Date: 2023-08-26 12:37:34.857468

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'aacad3289d3f'
down_revision = '68e28301eed8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_menu_items',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('menu_item_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['menu_item_id'], ['menu_items.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'menu_item_id')
    )

    if environment == "production":
            op.execute(f"ALTER TABLE order_menu_items SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_menu_items')
    # ### end Alembic commands ###