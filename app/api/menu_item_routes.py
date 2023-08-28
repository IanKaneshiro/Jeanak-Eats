from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import MenuItem, db
from app.forms import MenuItemForm

menu_item_routes = Blueprint('menu_items', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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

    if form.validate_on_submit():
        menu_item.name = form.data['name']
        menu_item.description = form.data['description']
        menu_item.price = form.data['price']
        menu_item.category = form.data['category']
        menu_item.dietary = form.data['dietary']
        menu_item.image_url = form.data['image_url']
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

    db.session.delete(menu_item)
    db.session.commit()
    return {"message": "Successfully deleted"}
