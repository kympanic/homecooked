from .db import db, environment, SCHEMA


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.String(10), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    #relationships
    product = db.relationship('Product', back_populates = 'product_reviews')
    user = db.relationship('User', back_populates = 'user_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'body': self.body,
            'userId': self.user_id,
            'productId': self.product_id,
            'product': self.product.to_dict_basic(),
            'user': self.user.to_dict_basic()
        }

    def to_dict_basic(self):
        return {
            'rating': self.rating,
            'body': self.body,
            'userId': self.user_id,
            'productId': self.product_id
        }
    def __repr__(self):
        return f"<Product id: {self.id}, description: {self.description}, user_id: {self.user_id}>"
