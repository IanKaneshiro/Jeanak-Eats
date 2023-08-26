from app.models import db, order_menu_items, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_menu_items():
    order = order_menu_items(
        order_id=1,
        menu_item_id=1
    )

    db.session.add(order)
    db.session.commit()


def undo_order_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_menu_items"))
        
    db.session.commit()
