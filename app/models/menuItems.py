

from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class MenuItems(db.Model):
    __tablename__ = 'MenuItems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    menuId = db.Column(db.Integer)
    description = db.Column(db.String)
    price = db.Column(db.Integer)
    type = db.Column(db.String)
    imageUrl = db.Column(db.String)
