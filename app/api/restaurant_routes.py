from flask import Blueprint, request
from sqlalchemy import and_
from app.models import Restaurant
from flask_login import login_required, current_user
from app.forms import RestaurantForm, ReviewForm, MenuItemForm
from app.models import Restaurant, Review, MenuItem, db
from app.api.aws import upload_file_to_s3, get_unique_filename, remove_file_from_s3, check_if_not_aws_file
from app.api.auth_routes import validation_errors_to_error_messages


restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/')
def restaurants():
    """
    Returns all restaurants
    """
    filters = []

    filter_price = request.args.get('price_range')

    if filter_price:
        filters.append(Restaurant.price_range == filter_price)
    if len(filters):
        filter_restaurants = Restaurant.query.filter(*filters).all()
        return {"Restaurants": [restaurant.to_dict_by_avg_rating() for restaurant in filter_restaurants]}
    else:
        restaurants = Restaurant.query.all()
        return {"Restaurants": [restaurant.to_dict_by_avg_rating() for restaurant in restaurants]}


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


@restaurant_routes.route('/new', methods=['POST'])
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
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
        else:
            url = None
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
            image_url=url,
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


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
        return {"errors": "Restaurant couldn't be found"}, 404
    if restaurant.owner_id != current_user.id:
        return {"errors": "Can only edit restaurants you own"}, 403
    # This works because the image_url field is a FileField and not is required, It shows up as none when you try and pass it a string,
    # therefore not passing the if statement
    if form.validate_on_submit():
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
            restaurant.image_url = url
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

        db.session.commit()
        return restaurant.to_dict_by_avg_rating()
    return validation_errors_to_error_messages(form.errors), 400


@restaurant_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_restaurant(id):
    """
    Deletes a restaurant by id
    """
    restaurant = Restaurant.query.get(int(id))
    if not restaurant:
        return {'errors': "Restaurant couldn't be found"}, 404
    if restaurant.owner_id != current_user.id:
        return {"errors": "Can only delete restaurants you own"}, 403
    if restaurant.image_url:
        remove_file_from_s3(restaurant.image_url)
    db.session.delete(restaurant)
    db.session.commit()
    return {"message": "Successfully deleted"}

# --------------------------------------- REVIEWS BY RESTAURANT ID ----------------------------------------------


@restaurant_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
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
        return {"errors": "Restaurant couldn't be found"}, 404

    if current_user.id == restaurant.owner_id:
        return {"errors": "Cannot review your own restaurant"}, 403

    has_review = Review.query.filter(and_(
        Review.user_id == current_user.id, Review.restaurant_id == id)).all()

    if has_review:
        return {'errors': "User already has a review for this restaurant"}, 403

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
        return {'errors': "Restaurant couldn't be found"}, 404
    return {"Reviews": [review.to_dict_restaurant_reviews() for review in restaurant.reviews]}


# ------------------------- Menu Items ---------------------------------

@restaurant_routes.route('/<int:id>/menuItems')
def menu_items_by_restaurant(id):
    """
    Get all items for a restaurant
    """
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return {"errors": "Restaurant couldn't be found"}, 404

    menu_items = MenuItem.query.filter(MenuItem.restaurant_id == id)

    return {"MenuItems": [item.to_dict() for item in menu_items]}


@restaurant_routes.route('/<int:id>/menuItems', methods=['POST'])
@login_required
def create_menu_item(id):
    """
    Create menu items by restaurant id
    """
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return {"errors": "Restaurant couldn't be found"}, 404

    if restaurant.owner_id != current_user.id:
        return {"errors": "Cannot add menu items to restaurant you do not own"}, 403

    form = MenuItemForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
        else:
            url=None

        menu_item = MenuItem(
            restaurant_id=id,
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            category=form.data['category'],
            dietary=form.data['dietary'],
            image_url=url
        )
        db.session.add(menu_item)
        db.session.commit()
        return menu_item.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
