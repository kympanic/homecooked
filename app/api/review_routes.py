from flask import Blueprint, request
from ..models import Review, User, db
from ..utils import Print
from flask_login import current_user, login_required


review_routes = Blueprint('reviews', __name__)

# User can update a review that they created
# PUT api/reviews/:id
@review_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def update_review():

    review_data = request.json

    #check if review id belongs to current user
    if review_data["user_id"] != current_user.id:
        return {"error": "You are not authorized to update this review"}, 401

    review = Review.query.get(review_data['id'])
    review.body = review_data['body']

    db.session.commit()

    return {review.id : review.to_dict()}




# User can delete a review that they posted
# DELETE api/reviews/:id
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review():
    review_data = request.json

    if review_data["user_id"] != current_user.id:
        return {"error": "You are not authorized to delete this review"}, 401

    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted"}

# tweet_routes = Blueprint('tweets', __name__)


# @tweet_routes.route('')
# def get_all_tweets():
#     tweets = Tweet.query.all()

#     res = {tweet.id: tweet.to_dict() for tweet in tweets}

#     return res





# @tweet_routes.route('', methods=["PATCH", "PUT"])
# def edit_tweet():
#     tweet_data = request.json

#     tweet = Tweet.query.get(tweet_data['id'])

#     tweet.text = tweet_data['text']

#     db.session.commit()

#     return {tweet.id: tweet.to_dict()}


# @tweet_routes.route('/<int:id>', methods=["DELETE"])
# def delete_tweet(id):
#     data = request.json

#     if data["user_id"] != current_user.id:
#         return {"error": "You are not authorized to delete this tweet"}, 401

#     tweet = Tweet.query.get(id)

#     db.session.delete(tweet)
#     db.session.commit()

#     return {"msg": "Successfully deleted"}
