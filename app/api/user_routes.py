from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Product, Order, Review,Payment, db
from flask_login import current_user
from app.forms import OrderForm, UserForm,ProfileForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('')
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

@user_routes.route('/<int:id>/orders')
@login_required
def get_orders_by_user(id):

    orders =Order.query.filter_by(user_id=id).all()
   

    res = {order.id: order.to_dict_basic() for order in orders}
 
    return res
    

#POST NEW ORDER BY USER ID
@user_routes.route('/orders',methods=['POST'])
@login_required
def add_order():
    form = OrderForm()

  
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


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()
        return {user.id: user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#EDIT PROFILE BASED ON USER ID
@user_routes.route('/profile/<int:id>', methods=['PUT','PATCH'])
@login_required
def edit_profile(id):
    user= User.query.get(id)
    form = ProfileForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(user)
        db.session.commit()
        return {user.id: user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401