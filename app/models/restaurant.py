from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)
    cuisine = db.Column(db.String(100), nullable=False)
    dietary = db.Column(db.String(100))
    price_range = db.Column(db.String(10), nullable=False)
    opens_at = db.Column(db.String(25), nullable=False)
    closes_at = db.Column(db.String(25), nullable=False)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    reviews = db.relationship('Review', back_populates='restaurant')
    owner = db.relationship('User', back_populates='owned_restaurant')
    orders = db.relationship('Order', back_populates='restaurant')
    menu_items = db.relationship('MenuItem', back_populates='restaurant')

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

    def to_dict_by_id(self):
        restaurant = self.to_dict()
        if self.reviews:
            avg_rating = sum(
                review.rating for review in self.reviews) / len(self.reviews)
            restaurant["avgRating"] = avg_rating
        else:
            restaurant['avgRating'] = None
        restaurant["numRatings"] = len(self.reviews)
        restaurant["MenuItems"] = [item.to_dict() for item in self.menu_items]
        return restaurant

    def to_dict_by_user(self):
        restaurant = self.to_dict()
        if self.reviews:
            avg_rating = sum(
                review.rating for review in self.reviews) / len(self.reviews)
            restaurant["avgRating"] = avg_rating
        else:
            restaurant['avgRating'] = None
        return restaurant
