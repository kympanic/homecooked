from flask import Blueprint, request
from ..models import Payment, db
from ..utils import Print
from flask_login import current_user

payment_routes = Blueprint('payments', __name__)

@payment_routes.route('/<int:id>')
def get_paymentinfo_by_id():
    paymentInfo = Payment.query.get(id)
    
    return paymentInfo.to_dict()

@payment_routes.route('', methods=["POST"])
def create_paymentinfo():
    paymentInfo = request.json
    
    # ** is Python's spread ('...' in JS)
    new_paymentInfo = Payment(**paymentInfo, user_id=current_user.id)
    
    db.session.add(new_paymentInfo)
    db.session.commit()
    
    return {new_paymentInfo.id: new_paymentInfo.to_dict()}