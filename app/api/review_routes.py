from flask import Blueprint, request
from ..models import Review, db
from ..utils import Print
from flask_login import current_user


review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def get_all_reviews():
    reviews = Review.query.all()
    Print(reviews)

    res = {review.id: review.to_dict() for review in reviews}
    return res

@review_routes.route('', methods=["POST"])
def create_new_review():
    review_data = request.json

    # ** is Python's spread('...' in JS)

    new_review = Review(**review_data, user_id=current_user.id)

    db.session.add(new_review)
    db.session.commit()

    return {new_review.id: new_review.to_dict()}
