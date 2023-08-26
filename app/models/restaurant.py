from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False )
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(75), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    cuisine = db.Column(db.String(25), nullable=False)
    dietary = db.Column(db.String(50))
    price_range = db.Column(db.String(10), nullable=False)
    opens_at = db.Column(db.String(25), nullable=False)
    closes_at = db.Column(db.String(25), nullable=False)
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'address': self.address, 
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'description': self.description,
            'cuisine': self.cuisine,
            'dietary': self.dietary,
            'priceRange': self.price_range,
            'opensAt': self.opens_at,
            'closesAt': self.closes_at,
            'imageUrl': self.image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
