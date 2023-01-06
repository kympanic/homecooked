from flask import Blueprint, request
from ..models import Review, User, db
from ..utils import Print
from flask_login import current_user, login_required


review_routes = Blueprint('reviews', __name__)

# User can update a review that they created
# PUT api/reviews/:id
@review_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_review(id):

    data = request.json

    #check if review id belongs to current user
    if data["user_id"] != current_user.id:
        return {"error": "You are not authorized to update this review"}, 401

    review = Review.query.get(id)
    if data.get('rating'):
        review.rating = data['rating']
    if data.get('body'):
        review.body = data['body']
    if data.get('user_id'):
        review.user_id = data['user_id']
    if data.get('product_id'):
        review.product_id = data['product_id']

    db.session.commit()

    return {review.id : review.to_dict()}

    # rating = db.Column(db.String(10), nullable=False)
    # body = db.Column(db.String(255), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)


# def edit_product(id):
#     product = Product.query.get(id)
#     data = request.json

#     Print(data)

#     if product.user_id != current_user.id:
#         return {'error': "You are not authorized to edit this product"}, 401

#     if data.get('name'):
#         product.name = data['name']
#     if data.get('description'):
#         product.description = data['description']
#     if data.get('image_url'):
#         product.image_url = data['image_url']
#     if data.get('price'):
#         product.price = data['price']

#     db.session.add(product)
#     db.session.commit()

#     return {product.id: product.to_dict()}



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
