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
        review="I loved the honey lavandar flavor!",
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

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
