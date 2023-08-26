from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_restaurants():
    mcdonalds = Restaurant(
        owner_id=1,
        name="McDonald's",
        address="609 Market St",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Home of the golden arches!",
        cuisine="fast-food",
        dietary="vegetarian",
        price_range="$",
        opens_at="6:00am",
        closes_at="10pm",
        image_url="https://s.hdnux.com/photos/01/31/12/73/23375552/3/rawImage.jpg"
    )

    db.session.add(mcdonalds)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()
