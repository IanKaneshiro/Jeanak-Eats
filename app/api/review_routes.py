from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    """
    Update a review by  id
    """
    form = ReviewForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)
    if not review:
        return {"message": "Review couldnt't be found"}, 404

    if review.user_id != current_user.id:
        return {"message": "You can only update reviews you created"}, 403

    if form.validate_on_submit():
        review.review = form.data['review']
        review.rating = form.data['rating']
        db.session.commit()
        return review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review by id
    """
    review = Review.query.get(id)
    if review.user_id != current_user.id:
        return {"message": "Review must belong to current user"}, 403
    if not review:
        return {'message': "Review couldn't be found"}, 404

    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted"}
