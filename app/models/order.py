from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .order_menu_item import order_menu_items


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    status = db.Column(db.String(25), nullable=False)
    delivery_time = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    customer = db.relationship('User', back_populates='orders')
    restaurant = db.relationship('Restaurant', back_populates='orders')
    menu_items = db.relationship('MenuItem', secondary=order_menu_items, back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restaurantId': self.restaurant_id,
            'status': self.status,
            'deliveryTime': self.delivery_time,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
