from .db import db, environment, SCHEMA


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
    avg_rating = db.Column(db.Numeric, nullable=False)
    price = db.Column(db.Numeric, nullable=False)

    #relationships
    user_products = db.relationship('User', back_populates = 'products')
    product_reviews = db.relationship('Review', back_populates ='products', cascade='all,delete')


def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'description': self.description,
            'imageURL': self.image_url,
            'profileImg': self.profile_img,
            'avgRating': self.avg_rating,
            'price': self.price,
        }

def __repr__(self):
        return f"<Product id: {self.id}, description: {self.description}, user_id: {self.user_id}, avg_rating: {self.avg_rating}>"
