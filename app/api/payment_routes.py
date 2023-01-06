from flask import Blueprint, request
from ..models import Payment, db
from ..utils import Print
from flask_login import current_user, login_required
import datetime


payment_routes = Blueprint('payments', __name__)

@payment_routes.route('/<int:id>')
@login_required
def get_paymentinfo_by_id(id):
    paymentInfo = Payment.query.get(id)
    
    return paymentInfo.to_dict()

@payment_routes.route('', methods=["POST"])
@login_required
def create_paymentinfo():
    paymentInfo = request.json
    
    # ** is Python's spread ('...' in JS)
    #take a string from expiration date and turn it into a datetime object here
    new_paymentInfo = Payment(**paymentInfo, expiration=datetime.date(2023,2,1), user_id=current_user.id)
    
    db.session.add(new_paymentInfo)
    db.session.commit()
    
    
    return {new_paymentInfo.id: new_paymentInfo.to_dict()}
    

@payment_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_paymentinfo():
    payment_data = request.json
    
    payment_info = Payment.query.get(payment_data['id'])
    
    payment_info.text = payment_data['text']
    
    db.session.commit()
    
    return {payment_info.id: payment_info.to_dict()}

@payment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_paymentinfo(id):
    data = request.json

    if data["user_id"] != current_user.id:
        return {"error": "You are not authorized to delete this payment information"}, 401
    
    payment_info = Payment.query.get(id)
    
    db.session.delete(payment_info)
    db.session.commit()
    
    return {"msg": "Successfully deleted"}