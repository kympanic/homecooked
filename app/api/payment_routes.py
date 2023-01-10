from flask import Blueprint, request
from ..models import Payment, db
from ..utils import Print
from flask_login import current_user, login_required
import datetime
from app.forms import PaymentForm


payment_routes = Blueprint('payments', __name__)

#GET Payment info by user ID
@payment_routes.route('/<int:id>')
@login_required
def get_paymentinfo_by_id(id):
    
    paymentInfo = Payment.query.get(id)
    
    return paymentInfo.to_dict()


#POST Payment info
@payment_routes.route('', methods=["POST"])
@login_required
def create_paymentinfo():

    form = PaymentForm()

    Print(form.data)
    exp_year = int(form.data["expiration"][-4:])
    exp_month = int(form.data["expiration"][:2])
    
    custom_expiration= datetime.date(exp_year,exp_month,1)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPayment = Payment(
            user_id = form.data["user_id"],
            provider = form.data["provider"],
            account_number = form.data["account_number"],
            expiration = custom_expiration
        )

        db.session.add(newPayment)
        db.session.commit()
        return {newPayment.id: newPayment.to_dict()}
    return {'errors': form.errors}
    
    # paymentInfo = request.json
    
    

    # paymentInfo["expiration"] = datetime.date(exp_year, exp_month, 1)
    # #this ONLY works if: 
    # #the date coming in is a string!
    # #the format of that string is MMYYYY
    # #put a dash between MM/YYYY or something else, it doesn't matter if there's anything between them since it looks at the first two and last four characters
    
    # # ** is Python's spread ('...' in JS)
    # #take a string from expiration date and turn it into a datetime object here
    # #idea is simple if convoluted.
    # #get the last four digits of the expiration date (the year) as its own string, then turn it into an integer
    # #get the first two digits of the expiration date (the month) as its own string, then turn it into an integer
    # #mutate the expiration date in the paymentInfo dictionary to be a datetime object that takes these integers as well as the day 01
    # #profit
    # new_paymentInfo = Payment(**paymentInfo, user_id=current_user.id)
    
    # db.session.add(new_paymentInfo)
    # db.session.commit()
    
    
    # return {new_paymentInfo.id: new_paymentInfo.to_dict()}
    

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