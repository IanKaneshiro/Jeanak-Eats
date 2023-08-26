from .db import db, environment, SCHEMA, add_prefix_for_prod
from .order import Order


order_menu_items = db.Table(
    "order_menu_items",
    db.Model.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_items.id'), primary_key=True)
)

if environment == "production":
    order_menu_items.schema = SCHEMA
