from flask import Blueprint, request
from ..models import Review, db
from ..utils import Print

reviews_routes = Blueprint('reviews', __name__)

# User can update a review that they created
# PUT api/reviews/:id
@reviews_routes.route('/reviews/<int:id>', methods=['PUT'])
def update_review():
    review_data = request.json
    review = Review.query.get(review_data['id'])
    review.body = review_data['body']

    db.session.commit()

    return {review.id : review.to_dict()}


# @bp.route("/orders/<int:id>/items", methods=["POST"])
# @login_required
# def add_to_order(id):
#     form = MenuItemAssignmentForm()
#     form.menu_item_ids.choices = [(item.id, '')
#                                   for item in MenuItem.query.all()]
#     from pprint import pprint
#     pprint(form.menu_item_ids.choices)
#     if form.validate_on_submit():
#         order = Order.query.get(id)
#         for menu_item_id in form.menu_item_ids.data:
#             detail = OrderDetail(order=order, menu_item_id=menu_item_id)
#             db.session.add(detail)
#         db.session.commit()
#     return redirect(url_for('.index'))


# User can delete a review that they posted
# DELETE api/reviews/:id


# tweet_routes = Blueprint('tweets', __name__)


# @tweet_routes.route('')
# def get_all_tweets():
#     tweets = Tweet.query.all()

#     res = {tweet.id: tweet.to_dict() for tweet in tweets}

#     return res


# @tweet_routes.route('', methods=["POST"])
# def create_new_tweet():
#     tweet_text = request.json

#     # ** is Python's spread ('...' in JS)
#     new_tweet = Tweet(**tweet_text, user_id=current_user.id)

#     db.session.add(new_tweet)
#     db.session.commit()

#     return {new_tweet.id: new_tweet.to_dict()}


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
