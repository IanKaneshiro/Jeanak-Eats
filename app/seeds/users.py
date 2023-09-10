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
    gary = User(
        first_name='Gary', last_name='Oldman', email='gary@aa.io', password='password', phone_number="9888888888", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')
    bruce = User(
        first_name='Bruce', last_name='Wayne', email='bruce@aa.io', password='password', phone_number="7888888888", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')
    david = User(
        first_name='David', last_name='Rose', email='david@aa.io', password='password', phone_number="6888888888", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')
    lydia = User(
        first_name='Lydia', last_name='Deetz', email='lydia@aa.io', password='password', phone_number="5888888888", image_url='https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(gary)
    db.session.add(bruce)
    db.session.add(david)
    db.session.add(lydia)
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
