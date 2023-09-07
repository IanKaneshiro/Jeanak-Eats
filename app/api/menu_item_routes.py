from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import MenuItem, Restaurant, db
from app.forms import MenuItemForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import RestaurantForm, ReviewForm, MenuItemForm
from app.models import Restaurant, Review, MenuItem, db
from app.api.aws import upload_file_to_s3, get_unique_filename, remove_file_from_s3, check_if_not_aws_file


menu_item_routes = Blueprint('menu_items', __name__)


@menu_item_routes.route('/<int:id>')
def menu_item_by_id(id):
    """
    Gets menu item by id
    """
    menu_item = MenuItem.query.get(id)
    if not menu_item:
        return {"message": "Menu Item couldn't be found"}, 404

    return menu_item.to_dict()


@menu_item_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_menu_item(id):
    """
    Update a menu item by id
    """
    form = MenuItemForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    menu_item = MenuItem.query.get(id)
    if not menu_item:
        return {"message": "Menu Item couldnt't be found"}, 404
    restaurant = Restaurant.query.get(menu_item.restaurant_id)
    if restaurant.owner_id != current_user.id:
        return {'message': "Cannot edit items you did not create"}, 403

    if form.validate_on_submit():
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
            menu_item.image_url = url
        # else:
        menu_item.name = form.data['name']
        menu_item.description = form.data['description']
        menu_item.price = form.data['price']
        menu_item.category = form.data['category']
        menu_item.dietary = form.data['dietary']
        # menu_item.image_url = form.data['image_url']
        db.session.commit()
        return menu_item.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@menu_item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_menu_item(id):
    """
    Delete a menu item by id
    """
    menu_item = MenuItem.query.get(id)

    if not menu_item:
        return {'message': "Menu Item couldn't be found"}, 404

    restaurant = Restaurant.query.get(menu_item.restaurant_id)
    if restaurant.owner_id != current_user.id:
        return {'message': "Cannot delete items you did not create"}, 403

    db.session.delete(menu_item)
    db.session.commit()
    return {"message": "Successfully deleted"}
