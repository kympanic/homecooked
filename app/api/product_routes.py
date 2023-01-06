from flask import Blueprint, request
from ..models import Product, Review, db
from ..utils import Print
from flask_login import current_user, login_required
# from ..forms import ReviewForm



product_routes = Blueprint('products', __name__)

@product_routes.route('')
def get_all_products():
    products = Product.query.all()
    Print(products)

    res = {product.id: product.to_dict() for product in products}
    Print(res)
    return res




# User can retrieve all reviews for a specific product id
# GET api/products/:id/reviews
@product_routes.route('/<int:id>/reviews', methods = ['GET'])
def get_reviews(id):
    #get reviews by product id
    reviews = Review.query.filter(Review.product_id == id).all()
    Print(reviews)

    res = {review.id: review.to_dict() for review in reviews}
    Print(res)
    return res


# User can post a review on a food item
# POST api/products/:id/reviews
@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    # form = ReviewForm()
    review_text = request.json

    if review_text["user_id"] != current_user.id:
        return {"error": "You are not authorized to create a review"}, 401

    new_review = Review(**review_text)
    db.session.add(new_review)
    db.session.commit()

    return {new_review.id: new_review.to_dict()}



# @tweet_routes.route('', methods=["POST"])
# def create_new_tweet():
#     tweet_text = request.json

#     # ** is Python's spread ('...' in JS)
#     new_tweet = Tweet(**tweet_text, user_id=current_user.id)

#     db.session.add(new_tweet)
#     db.session.commit()

#     return {new_tweet.id: new_tweet.to_dict()}


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
