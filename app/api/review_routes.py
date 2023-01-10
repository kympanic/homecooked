from flask import Blueprint, request, redirect
from ..models import Review, User, db
from ..utils import Print
from flask_login import current_user, login_required
from app.forms import ReviewForm


review_routes = Blueprint('reviews', __name__)

#GET ALL THE REVIEWS 
@review_routes.route('')
def get_all_reviews():
    reviews = Review.query.all()

    Print(reviews)

    res = {review.id: review.to_dict() for review in reviews}
    
    return res


# User can update a review that they created
# PUT api/reviews/:id
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

# User can delete a review that they posted
# DELETE api/reviews/:id
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review_data = request.json

    if review_data["user_id"] != current_user.id:
        return {"error": "You are not authorized to delete this review"}, 401

    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted"},redirect(f'/reviews')

## update review form
# @review_routes.route('/<int:id>', method=['PUT'])
# def updateReview(id):
#     form = ReviewForm()
#     if form.validate_on_submit():
#         review = Review.query.filter_by(id=f'{id}')
#         review.rating = form.data['rating']
#         review.body = form.data['body']
#         db.session.commit()
#         return redirect(f'/reviews')
