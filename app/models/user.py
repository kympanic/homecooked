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
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    zipcode = db.Column(db.Integer, nullable=False,)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationship
    products = db.relationship('Product', back_populates = 'user_products', cascade = 'all, delete')
    user_reviews = db.relationship('Review', back_populates='user', cascade = 'all, delete')
    user_orders = db.relationship('Order', back_populates='orders', cascade = 'all, delete')

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
            'phoneNumber': self.phone_number,
            'zipcode': self.zipcode
        }
