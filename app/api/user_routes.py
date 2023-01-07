from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Order, db
from flask_login import current_user
from ..utils import Print

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/orders')
@login_required
def get_all_orders_by_specific_user(id):
    if id != current_user.id:
        return {"error": "You are not authorized to view this information"}, 401
    orders = Order.query.all()
    users_orders = dict()
    
    for order in orders:
        if order.user_id == id:
            users_orders[order.id] = order.to_dict()
    
    return users_orders