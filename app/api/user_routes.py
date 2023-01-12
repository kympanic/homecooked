from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Product, Order, Review,Payment, db
from flask_login import current_user
from app.forms import OrderForm, UserForm
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

#POST NEW ORDER BY USER ID
@user_routes.route('/<int:id>/orders',methods=['POST'])
@login_required
def add_order():
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

#EDIT USER BASED ON USER ID
@user_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    form = UserForm()

    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this information"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()

    return {user.id: user.to_dict()}
