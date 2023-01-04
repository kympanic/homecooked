from .db import db, environment, SCHEMA



class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id: 1,
	# 		userId: 1,
	# 		name: "Yummy Product",
	# 		description: "Yummy in my tummy",
	# 		imageUrl: "www.yummyproduct.com",
	# 		avgRating: 4.5,
	# 		price: 3.99,

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    shop_name = db.Column(db.String(255), unique=True)
    profile_img = db.Column(db.String(255), unique=True)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    zipcode = db.Column(db.Integer, nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
