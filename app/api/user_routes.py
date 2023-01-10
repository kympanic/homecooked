from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Product, Order, Review,Payment, db
from flask_login import current_user
from app.forms import OrderForm
from ..utils import Print

user_routes = Blueprint('users', __name__)


@user_routes.route('/')

def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    res = {user.id: user.to_dict() for user in users}
    return res

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#GET ALL PRODUCTS FOR A USER DEPENDING ON USERID
@user_routes.route('/<int:id>/products')
def user_products(id):
    
    products = Product.query.filter(Product.user_id == id).all()

    res = {product.id: product.to_dict() for product in products}

    return res

#NEEDS TO BE TESTED
#GET ALL ORDERS FOR A USER DEPENDING ON USERID
@user_routes.route('/<int:id>/orders', methods=['GET'])
@login_required
def get_all_orders_by_specific_user(id):

    if id != current_user.id:
        return {"error": "You are not authorized to view this information"}, 401

    orders = Order.query.filter(Order.user_id == id).all()

    users_orders = {order.id: order.to_dict() for order in orders}
    
    return users_orders

@user_routes.route('/<int:id>/orders',methods=['POST'])
@login_required
def  add_order():
    form = OrderForm()

    Print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order()
        form.populate_obj(order)

        db.session.add(order)
        db.session.commit()
        return {order.id: order.to_dict()}
    return {'errors': form.errors}

#NEEDS TO BE TESTED
#GET ALL USERS THAT HAVE A STORE
@user_routes.route('/stores')
def users_with_stores():
    users = User.query.filter(User.shop_name != None).all()
    res = {user.id: user.to_dict() for user in users}
    
    return res
    
#GET ALL REVIEWS FOR USER DEPENDING ON USERID
@user_routes.route('/<int:id>/reviews')
def get_all_reviews_by_specific_user(id):
    reviews = Review.query.filter(Review.user_id == id).all()

    res = {review.id: review.to_dict() for review in reviews}
    return res

#GET ALL PAYMENTS FOR USER DEPENDING ON USERID
@user_routes.route("/<int:id>/payments")
@login_required
def get_all_payments_by_specific_user(id):
    payments = Payment.query.filter(Payment.user_id == id).all()

    res={payment.id: payment.to_dict() for payment in payments}
    return res