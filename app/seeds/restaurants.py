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
        cuisine="American",
        dietary="",
        price_range="$",
        opens_at="6:00am",
        closes_at="10pm",
        image_url="https://s.hdnux.com/photos/01/31/12/73/23375552/3/rawImage.jpg"
    )
    burger_king = Restaurant(
        owner_id=1,
        name="Burger King",
        address="819 Van Ness Avenue",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Burger king rocks!",
        cuisine="American",
        dietary="",
        price_range="$",
        opens_at="6:00am",
        closes_at="10:40pm",
        image_url="https://lh3.googleusercontent.com/p/AF1QipPfqwSFnQqpb9G6y64HZBKQ0hIMJHlCWbZ-mV6R=s680-w680-h510"
    )
    house_of_dim_sum = Restaurant(
        owner_id=2,
        name="House of Dim Sum",
        address="735 Jackson Street",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Best place to get dim sum in San Fran!",
        cuisine="Chinese",
        dietary="",
        price_range="$",
        opens_at="6:30am",
        closes_at="6:30pm",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Y_EqxJL65QXXBQfUueczJA/o.jpg"
    )
    papalote_mexican_grill = Restaurant(
        owner_id=2,
        name="Papalote Mexican Grill (Fulton)",
        address="1777 Fulton Street",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Love mexican food, you'll love this place",
        cuisine="Mexican",
        dietary="vegan",
        price_range="$$",
        opens_at="11:00am",
        closes_at="9:00pm",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Y_EqxJL65QXXBQfUueczJA/o.jpg"
    )
    mastros = Restaurant(
        owner_id=3,
        name="Mastros",
        address="399 Geary Street",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Best steak in the area",
        cuisine="American",
        dietary="",
        price_range="$$$$",
        opens_at="5:00pm",
        closes_at="9:00pm",
        image_url="https://lh3.googleusercontent.com/p/AF1QipPJboC4WHUivnAdybpKbrI4ASv9wiiY-dEYgF0=s680-w680-h510"
    )
    salt_and_straw = Restaurant(
        owner_id=3,
        name="Salt & Straw (Hayes Valley)",
        address="586 Hayes Street",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Best ice cream!",
        cuisine="Ice Cream",
        dietary="",
        price_range="$$$",
        opens_at="11:00am",
        closes_at="10:45pm",
        image_url="https://lh3.googleusercontent.com/p/AF1QipPJboC4WHUivnAdybpKbrI4ASv9wiiY-dEYgF0=s680-w680-h510"
    )
    maxes_opera = Restaurant(
        owner_id=2,
        name="Max's Opera Cafe",
        address="601 Van Ness",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Lovely cafe!",
        cuisine="American",
        dietary="",
        price_range="$$",
        opens_at="11:00am",
        closes_at="8:55pm",
        image_url="https://lh3.googleusercontent.com/p/AF1QipMfhAoBItzZxBAr7qH1E7UTV-juP3jYyL9rhN8h=s680-w680-h510"
    )
    truly_mediterranean = Restaurant(
        owner_id=2,
        name="Truly Mediterranean",
        address="3109 16th Street",
        city="San Francisco",
        state="California",
        country="United States of America",
        description="Mediterranean food!",
        cuisine="Mediterranean",
        dietary="vegan",
        price_range="$$",
        opens_at="10:30am",
        closes_at="9:45pm",
        image_url="https://lh3.googleusercontent.com/p/AF1QipMERoelnB9ed5aiJ7SdsTUJs-3kYUnuXPEriaQW=s680-w680-h510"
    )

    db.session.add(mcdonalds)
    db.session.add(burger_king)
    db.session.add(house_of_dim_sum)
    db.session.add(papalote_mexican_grill)
    db.session.add(mastros)
    db.session.add(salt_and_straw)
    db.session.add(maxes_opera)
    db.session.add(truly_mediterranean)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
