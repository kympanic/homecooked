from flask import Blueprint, request
from ..models import Payment, db
from ..utils import Print
from flask_login import current_user, login_required
from app.forms import PaymentForm


payment_routes = Blueprint('payments', __name__)

#GET ALL PAYMENTS INFO BY USERID
@payment_routes.route('/<int:id>')
@login_required
def get_paymentinfo_by_id(id):
    payments =Payment.query.filter_by(user_id=id).all()
   
<<<<<<< HEAD
=======
    # if payments.user_id != current_user.id:
    #     return {"error": "You are not authorized to view this payment information"}, 401
>>>>>>> 9960e27b89291ecce7de068dc018a105ee0efcaa
    
    res = {payment.id: payment.to_dict() for payment in payments}
 
    return res

#POST PAYMENT
@payment_routes.route('', methods=["POST"])
@login_required
def create_paymentinfo():
    form = PaymentForm()
    payment = Payment()
   
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(payment)

        db.session.add(payment)
        db.session.commit()
        return {payment.id: payment.to_dict()}
    return {'errors': form.errors}

#EDIT A PAYMENT BASED ON ID
@payment_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_paymentinfo(id):
    payment = Payment.query.get(id)
    form = PaymentForm()
 
    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this product"}, 401

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(payment)
        db.session.commit()

    return {payment.id: payment.to_dict()}

#DELETE A PAYMENT BASED ON ID
@payment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_paymentinfo(id):
    payment_info = Payment.query.get(id)

    if payment_info.user_id != current_user.id:
        return {"error": "You are not authorized to delete this payment information"}, 401
    
    db.session.delete(payment_info)
    db.session.commit()
    
    return {"msg": "Successfully deleted"}