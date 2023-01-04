from .db import db, environment, SCHEMA
from ..utils import Print

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    profile_img = db.Column(db.String(255))
    price = db.Column(db.String(40), nullable=False)

    #relationships
    user_products = db.relationship('User', back_populates = 'products')
    product_reviews = db.relationship('Review', back_populates ='products', cascade='all,delete')



    def to_dict(self):

        #conversion to get average rating on products
        my_list_ratings = [review.to_dict()['rating'] for review in self.product_reviews]
        #convert to float from string
        converted_ratings = [float(x) for x in my_list_ratings]
        #get the average
        total = sum(converted_ratings)
        avg = total / len(converted_ratings)

        #conversion to float from string for PRICE
        converted_price = float(self.price)

        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'description': self.description,
            'imageURL': self.image_url,
            'profileImg': self.profile_img,
            'avgRating': avg,
            'price': converted_price,
        }

    def __repr__(self):
        return f"<Product id: {self.id}, description: {self.description}, user_id: {self.user_id}>, avgRating: {self.to_dict()['avgRating']}"
