from flask import Blueprint, request
from app.models import Restaurant
from flask_login import login_required, current_user
from app.forms import RestaurantForm
from app.models import Restaurant, db

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


@restaurant_routes.route('/<id>')
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
            image_url=form.data['image_url']
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
