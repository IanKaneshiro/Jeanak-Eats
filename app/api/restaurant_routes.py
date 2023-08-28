from flask import Blueprint, request
from app.models import Restaurant
from flask_login import login_required, current_user
from app.forms import RestaurantForm, ReviewForm
from app.models import Restaurant, Review, db


restaurant_routes = Blueprint('restaurants', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@restaurant_routes.route('/')
def restaurants():
    """
    Returns all restaurants
    """
    restaurants = Restaurant.query.all()
    return {"Restaurants": [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/<int:id>')
def restaurant_by_id(id):
    """
    Returns restaurant by its id
    """
    restaurant = Restaurant.query.get(int(id))
    if restaurant:
        return restaurant.to_dict_by_id()
    else:
        return {"message": "Restaurant couldn't be found"}, 404


@restaurant_routes.route('/', methods=['POST'])
@login_required
def create_restaurant():
    """
    Creates a new restaurant
    """
    form = RestaurantForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant = Restaurant(
            owner_id=current_user.id,
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            description=form.data['description'],
            cuisine=form.data['cuisine'],
            dietary=form.data['dietary'],
            price_range=form.data['price_range'],
            opens_at=form.data['opens_at'],
            closes_at=form.data['closes_at'],
            image_url=form.data['image_url'],
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_restaurant(id):
    """
    Updates a restaurant
    """
    form = RestaurantForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        return {"message": "Restaurant couldn't be found"}, 404
    if form.validate_on_submit():
        restaurant.name = form.data['name']
        restaurant.address = form.data['address']
        restaurant.city = form.data['city']
        restaurant.state = form.data['state']
        restaurant.country = form.data['country']
        restaurant.description = form.data['description']
        restaurant.cuisine = form.data['cuisine']
        restaurant.dietary = form.data['dietary']
        restaurant.price_range = form.data['price_range']
        restaurant.opens_at = form.data['opens_at']
        restaurant.closes_at = form.data['closes_at']
        restaurant.image_url = form.data['image_url']
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>', methods=["DELETE"])
def delete_restaurant(id):
    """
    Deletes a restaurant by id
    """
    restaurant = Restaurant.query.get(int(id))
    if not restaurant:
        return {'message': "Restaurant couldn't be found"}, 404
    db.session.delete(restaurant)
    db.session.commit()
    return {"message": "Successfully deleted"}


@restaurant_routes.route('/<int:id>/reviews', methods=["POST"])
def create_restaurant_review(id):
    """
    Create a review for a restaurant by id
    """
    form = ReviewForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        return {"message": "Restaurant couldn't be found"}, 404
    if current_user.id == restaurant.owner_id:
        return {"message": "Cannot review your own restaurant"}, 403
    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            restaurant_id=id,
            review=form.data['review'],
            rating=form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>/reviews')
def restaurant_reviews(id):
    """
    Gets all reviews for restaurant by id
    """
    restaurant = Restaurant.query.get(int(id))
    if not restaurant:
        return {'message': "Restaurant couldn't be found"}, 404
    return {"Reviews": [review.to_dict_restaurant_reviews() for review in restaurant.reviews]}
