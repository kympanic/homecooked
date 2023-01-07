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
    
    exp_year = int(paymentInfo["expiration"][-4:])
    exp_month = int(paymentInfo["expiration"][:2])

    paymentInfo["expiration"] = datetime.date(exp_year, exp_month, 1)
    
    
    # ** is Python's spread ('...' in JS)
    #take a string from expiration date and turn it into a datetime object here
    #idea is simple if convoluted.
    #get the last four digits of the expiration date (the year) as its own string, then turn it into an integer
    #get the first two digits of the expiration date (the month) as its own string, then turn it into an integer
    #mutate the expiration date in the paymentInfo dictionary to be a datetime object that takes these integers as well as the day 01
    #profit
    new_paymentInfo = Payment(**paymentInfo, user_id=current_user.id)
    
    db.session.add(new_paymentInfo)
    db.session.commit()
    
    
    return {new_paymentInfo.id: new_paymentInfo.to_dict()}
    

@payment_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_paymentinfo(id):
    payment_data = request.json
    
    exp_year = int(payment_data["expiration"][-4:])
    exp_month = int(payment_data["expiration"][:2])

    payment_data["expiration"] = datetime.date(exp_year, exp_month, 1)
    
    payment_info = Payment.query.get(id)
    
    payment_info.provider = payment_data['provider']
    payment_info.account_number = payment_data['account_number']
    payment_info.expiration = payment_data['expiration']
    
    db.session.commit()
    
    return {payment_info.id: payment_info.to_dict()}

@payment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_paymentinfo(id):
    payment_info = Payment.query.get(id)

    if payment_info.user_id != current_user.id:
        return {"error": "You are not authorized to delete this payment information"}, 401
    
    
    
    db.session.delete(payment_info)
    db.session.commit()
    
    return {"msg": "Successfully deleted"}