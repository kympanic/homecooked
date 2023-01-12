from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    shop_name = db.Column(db.String(255), unique=True)
    profile_img = db.Column(db.String(255))
    shop_logo_img = db.Column(db.String(255))
    shop_splash_img = db.Column(db.String(255))
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    zipcode = db.Column(db.String, nullable=False,)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationships
    products = db.relationship('Product', back_populates = 'user_products', cascade = 'all, delete')
    user_reviews = db.relationship('Review', back_populates='user', cascade = 'all, delete')
    user_orders = db.relationship('Order', back_populates='user', cascade = 'all, delete')
    user_credit_cards = db.relationship('Payment', back_populates='user_payments', cascade='all,delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'shopName': self.shop_name,
            'profileImg': self.profile_img,
            'shopLogoImg': self.shop_logo_img,
            'shopSplashImg': self.shop_splash_img,
            'phoneNumber': self.phone_number,
            'zipcode': self.zipcode,
            'products': [product.to_dict_basic() for product in self.products],
            'reviews':[review.to_dict_basic() for review in self.user_reviews],
            'orders': [order.to_dict_basic() for order in self.user_orders],
            'creditCards': [payment.to_dict_basic() for payment in self.user_credit_cards],
        }

    def to_dict_basic(self):
        return {
            'username': self.username,
            'email': self.email,
            'shopName': self.shop_name,
            'phoneNumber': self.phone_number,
            'profileImg': self.profile_img,
            'zipcode': self.zipcode
        }