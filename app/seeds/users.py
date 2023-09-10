from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', password='password', phone_number="1234567891", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')
    marnie = User(
        first_name='Marnie', last_name='Test', email='marnie@aa.io', password='password', phone_number="5555555555", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')
    bobbie = User(
        first_name='Bobbie', last_name='Testing', email='bobbie@aa.io', password='password', phone_number="8888888888", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
