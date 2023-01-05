from .db import db, environment, SCHEMA


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'), nullable=False)


    #relationships
    orders = db.relationship('User',back_populates = 'user_orders')
    order_products = db.relationship('Product',back_populates = 'product_orders')

def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'paymentId': self.payment_id,
        }
