from .db import db, environment, SCHEMA
from .product_orders import product_orders

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'), nullable=False)

    #relationships
    user = db.relationship('User',back_populates = 'user_orders')
    products_with_order = db.relationship('Product', secondary=product_orders, back_populates = 'product_orders', cascade='all,delete')
    payment = db.relationship('Payment', back_populates='payment_orders')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'paymentId': self.payment_id,
            'user': self.user.to_dict_basic(),
            'payment': self.payment.to_dict_basic()
        }

    def to_dict_basic(self):
        return {
            'userId': self.user_id,
            'paymentId': self.payment_id,
            'products': [product.to_dict_basic() for product in self.products_with_order],
        }
