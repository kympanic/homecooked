from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    review1 = Review(rating = '1.5', body = "This is a test review1", user_id = 1, product_id = 1)
    review2 = Review(rating = '2.5', body = "This is a test review2", user_id = 1, product_id = 1)
    review3 = Review(rating = '1.5', body = "This is a test review3", user_id = 2, product_id = 1)
    review4 = Review(rating = '1.5', body = "This is a test review4", user_id = 2, product_id = 1)
    review5 = Review(rating = '1.5', body = "This is a test review5", user_id = 3, product_id = 1)
    review6 = Review(rating = '1.5', body = "This is a test review6", user_id = 3, product_id = 1)
    db.session.add_all([review1,review2,review3,review4,review5,review6])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
