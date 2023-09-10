from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    mcdonalds_review = Review(
        user_id=3,
        restaurant_id=1,
        review="These fries are so good",
        rating=5
    )
    review1 = Review(
        user_id=2,
        restaurant_id=1,
        review="The nuggets were soggy",
        rating=2
    )
    review2 = Review(
        user_id=2,
        restaurant_id=2,
        review="The place is meh",
        rating=3
    )
    review3 = Review(
        user_id=3,
        restaurant_id=2,
        review="Loved it, best fast food joint!",
        rating=5
    )
    review4 = Review(
        user_id=1,
        restaurant_id=3,
        review="Love me some good dim sum",
        rating=5
    )
    review5 = Review(
        user_id=3,
        restaurant_id=3,
        review="Best chinese place in San Fran!",
        rating=5
    )
    review6 = Review(
        user_id=1,
        restaurant_id=4,
        review="Enchiladas were ok",
        rating=3
    )
    review7 = Review(
        user_id=3,
        restaurant_id=4,
        review="I love this place!",
        rating=5
    )
    review8 = Review(
        user_id=1,
        restaurant_id=5,
        review="The steaks are so delicious!",
        rating=5
    )
    review9 = Review(
        user_id=2,
        restaurant_id=5,
        review="Very expensive sides",
        rating=2
    )
    review10 = Review(
        user_id=1,
        restaurant_id=6,
        review="I loved the honey lavender flavor!",
        rating=5
    )
    review11 = Review(
        user_id=2,
        restaurant_id=6,
        review="Huge selection of flavors! I was overwhelmed! And sad...",
        rating=2
    )
    review12 = Review(
        user_id=1,
        restaurant_id=7,
        review="Nice place!",
        rating=4
    )
    review13 = Review(
        user_id=3,
        restaurant_id=7,
        review="Sort of a rowdy crowd of people",
        rating=2
    )
    review14 = Review(
        user_id=1,
        restaurant_id=8,
        review="The lamb was good!",
        rating=5
    )
    review15 = Review(
        user_id=3,
        restaurant_id=8,
        review="The lamb was bad!",
        rating=1
    )
    review16 = Review(
        user_id=6,
        restaurant_id=9,
        review="The milkshakes were so good I ordered 4 of them all for me!",
        rating=5
    )
    review17 = Review(
        user_id=7,
        restaurant_id=9,
        review="The cheese fries were awesome",
        rating=4
    )
    review18 = Review(
        user_id=4,
        restaurant_id=9,
        review="I'm just saying, they could have given me more avocado. But it was fine.",
        rating=3
    )
    review19 = Review(
        user_id=5,
        restaurant_id=11,
        review="I got three orders of spam musubi, and each one was superb!",
        rating=5
    )
    review20 = Review(
        user_id=6,
        restaurant_id=11,
        review="I got the chicken katsu. Very tasty!",
        rating=4
    )
    review21 = Review(
        user_id=5,
        restaurant_id=10,
        review="The pizza was alright, and I had a generally good meal",
        rating=4
    )
    review22 = Review(
        user_id=2,
        restaurant_id=10,
        review="I come here all the time. Good pizza, good service, and just as good delivered",
        rating=5
    )
    review23 = Review(
        user_id=4,
        restaurant_id=10,
        review="Ok, so this happens EVERY time I order. I order a pepperoni pizza, and they bring me a Hawaiian. I don't know why. What did I do to you, Blondie's??",
        rating=1
    )
    review24 = Review(
        user_id=6,
        restaurant_id=10,
        review="Their pesto chicken pizza was good",
        rating=5
    )

    db.session.add(mcdonalds_review)
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
