from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float(), nullable=False)
    category = db.Column(db.String(25), nullable=False)
    dietary = db.Column(db.String(50))
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'restaurantId': self.restaurant_id,
            'name': self.name, 
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'dietary': self.dietary,
            'imageUrl': self.image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
