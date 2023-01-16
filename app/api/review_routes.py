from flask import Blueprint, request, redirect
from ..models import Review, User, db
from ..utils import Print
from flask_login import current_user, login_required
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


#GET ALL THE REVIEWS 
@review_routes.route('')
def get_all_reviews():
    reviews = Review.query.all()

    res = {review.id: review.to_dict() for review in reviews}
    return res

#GET SPECIFIC REVIEW BY REVIEWID
@review_routes.route('/<int:id>')
def get_review_by_review_id(id):
    review = Review.query.get(id)

    res = {review.id: review.to_dict()}
    Print(res)
    return res

#EDIT REVIEW BASED ON REVIEWID
@review_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    form = ReviewForm()
    
    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this product"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        return {review.id: review.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#DELETE A REVIEW BASED ON REVIEWID
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review.user_id != current_user.id:
        return {"error": "You are not authorized to delete this review"}, 401

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted"}


