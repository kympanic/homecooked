from .db import db, environment, SCHEMA
from ..utils import Print

class Payment(db.Model):
    __tablename__ = 'payments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider = db.Column(db.String(255), nullable=False)
    account_number = db.Column(db.String(16), nullable=False, unique=True)
    expiration = db.Column(db.String(6), nullable=False)
    
    #relationships
    user_payments = db.relationship('User', back_populates = 'user_credit_cards')
    payment_orders = db.relationship('Order', back_populates='payment')
    
    def to_dict(self):
        
        #store account number as ONLY the last four digits
        last_four_account_numbers = int(self.account_number[-4:])

        return {
            'id': self.id,
            'userId': self.user_id,
            'provider': self.provider,
            'accountNumber': last_four_account_numbers,
            'expiration': self.expiration,
            'user': self.user_payments.to_dict_basic(),
            'orders': [order.to_dict_basic() for order in self.payment_orders]
        }
    
    def to_dict_basic(self):

        last_four_account_numbers = int(self.account_number[-4:])

        return{
            'paymentId': self.id,
            'provider': self.provider,
            'accountNumber': last_four_account_numbers,
            'expiration': self.expiration
        }
    