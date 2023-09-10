from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    mcdonalds = Restaurant(
        owner_id=1,
        name="McDonald's",
        address="609 Market St",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Home of the golden arches!",
        cuisine="American",
        dietary="",
        price_range="$",
        opens_at="06:00",
        closes_at="22:00",
        image_url="https://s.hdnux.com/photos/01/31/12/73/23375552/3/rawImage.jpg"
    )
    burger_king = Restaurant(
        owner_id=1,
        name="Burger King",
        address="819 Van Ness Avenue",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Burger king rocks!",
        cuisine="American",
        dietary="",
        price_range="$",
        opens_at="06:00",
        closes_at="20:40",
        image_url="https://lh3.googleusercontent.com/p/AF1QipPfqwSFnQqpb9G6y64HZBKQ0hIMJHlCWbZ-mV6R=s680-w680-h510"
    )
    house_of_dim_sum = Restaurant(
        owner_id=2,
        name="House of Dim Sum",
        address="735 Jackson Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Best place to get dim sum in San Fran!",
        cuisine="Chinese",
        dietary="",
        price_range="$",
        opens_at="06:30",
        closes_at="18:30",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/Y_EqxJL65QXXBQfUueczJA/o.jpg"
    )
    papalote_mexican_grill = Restaurant(
        owner_id=2,
        name="Papalote Mexican Grill (Fulton)",
        address="1777 Fulton Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Love mexican food, you'll love this place",
        cuisine="Mexican",
        dietary="vegan",
        price_range="$$",
        opens_at="11:00",
        closes_at="21:00",
        image_url="https://res.cloudinary.com/dmkyocbqi/image/upload/v1694061492/P1000443_xflqid.jpg"
    )
    mastros = Restaurant(
        owner_id=3,
        name="Mastros",
        address="399 Geary Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Best steak in the area",
        cuisine="American",
        dietary="",
        price_range="$$$$",
        opens_at="17:00",
        closes_at="21:00",
        image_url="https://res.cloudinary.com/dmkyocbqi/image/upload/v1694061365/2023-05-30_ebrmui.jpg"
    )
    salt_and_straw = Restaurant(
        owner_id=3,
        name="Salt & Straw (Hayes Valley)",
        address="586 Hayes Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Best ice cream!",
        cuisine="Ice Cream",
        dietary="",
        price_range="$$$",
        opens_at="11:00",
        closes_at="22:45",
        image_url="https://res.cloudinary.com/dmkyocbqi/image/upload/v1694061551/PXL_20230507_012046085_2_hfu6ok.jpg"
    )
    maxes_opera = Restaurant(
        owner_id=2,
        name="Max's Opera Cafe",
        address="601 Van Ness",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Lovely cafe!",
        cuisine="American",
        dietary="",
        price_range="$$",
        opens_at="11:00",
        closes_at="20:55",
        image_url="https://res.cloudinary.com/dmkyocbqi/image/upload/v1694061455/Maxs_Logo_copy_ut1ssy.jpg"
    )
    truly_mediterranean = Restaurant(
        owner_id=2,
        name="Truly Mediterranean",
        address="3109 16th Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Mediterranean food!",
        cuisine="Mediterranean",
        dietary="vegan",
        price_range="$$",
        opens_at="10:30",
        closes_at="21:45",
        image_url="https://res.cloudinary.com/dmkyocbqi/image/upload/v1694061365/20210330_181300_06_zbau9j.jpg"
    )
    shake_shack = Restaurant(
        owner_id=1,
        name="Shake Shack",
        address="3060 Fillmore Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Our custom 100% Angus beef blend, never frozen, no hormones or antibiotics ever, humanely raised and grazed in the USA",
        cuisine="American",
        dietary="",
        price_range="$$",
        opens_at="11:00",
        closes_at="20:30",
        image_url="https://media.bizj.us/view/img/10781252/centercal-one*1200xx1562-880-0-154.png"
    )
    blondies_pizza = Restaurant(
        owner_id=3,
        name="Blondie's Pizza",
        address="865 Market Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Blondie's Pizza!",
        cuisine="Pizza",
        dietary="",
        price_range="$$",
        opens_at="10:00",
        closes_at="20:00",
        image_url="https://s.hdnux.com/photos/46/20/22/10028185/5/rawImage.jpg"
    )
    ll_hawaiianbbq = Restaurant(
        owner_id=2,
        name="L&L Hawaiian Barbecue",
        address="312 Kearny Street",
        city="San Francisco",
        state="CA",
        country="USA",
        description="Hawaiian barbecue!",
        cuisine="Hawaiian",
        dietary="",
        price_range="$",
        opens_at="09:30",
        closes_at="19:00",
        image_url="https://tableagent.s3.amazonaws.com/media/originals/2805_7273.jpg"
    )
    enssaro = Restaurant(
        owner_id=2,
        name="Enssaro",
        address="357a Grand Ave",
        city="Oakland",
        state="CA",
        country="USA",
        description="Ethiopian food",
        cuisine="Ethiopian",
        dietary="",
        price_range="$$",
        opens_at="10:00",
        closes_at="22:00",
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/h8OrrBlqVtimMJpvFQLmiA/l.jpg"
    )

    db.session.add(mcdonalds)
    db.session.add(burger_king)
    db.session.add(house_of_dim_sum)
    db.session.add(papalote_mexican_grill)
    db.session.add(mastros)
    db.session.add(salt_and_straw)
    db.session.add(maxes_opera)
    db.session.add(truly_mediterranean)
    db.session.add(shake_shack)
    db.session.add(blondies_pizza)
    db.session.add(ll_hawaiianbbq)
    db.session.add(enssaro)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
