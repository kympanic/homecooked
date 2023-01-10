from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    review1 = Review(rating = '1.5', body = "This is a test review1", user_id = 1, product_id = 4)
    review2 = Review(rating = '4.3', body = "This is a test review2", user_id = 1, product_id = 5)
    review3 = Review(rating = '1.5', body = "This is a test review3", user_id = 1, product_id = 6)
    review4 = Review(rating = '3.5', body = "This is a test review4", user_id = 1, product_id = 1)
    review5 = Review(rating = '4.2', body = "This is a test review5", user_id = 1, product_id = 2)
    review6 = Review(rating = '3.3', body = "This is a test review6", user_id = 2, product_id = 1)
    review7 = Review(rating = '1.3', body = "This is a test review7", user_id = 2, product_id = 2)
    review8 = Review(rating = '2.9', body = "This is a test review8", user_id = 2, product_id = 3)
    review9 = Review(rating = '4.5', body = "This is a test review9", user_id = 2, product_id = 7)
    review10 = Review(rating = '3.2', body = "This is a test review10", user_id = 2, product_id = 8)
    review11 = Review(rating = '1.1', body = "This is a test review11", user_id = 3, product_id = 1)
    review12 = Review(rating = '4.5', body = "This is a test review12", user_id = 3, product_id = 3)
    review13 = Review(rating = '5.0', body = "This is a test review13", user_id = 3, product_id = 9)
    review14 = Review(rating = '2.4', body = "This is a test review14", user_id = 3, product_id = 8)
    review15 = Review(rating = '2.8', body = "This is a test review15", user_id = 3, product_id = 7)
    review16 = Review(rating = '4.4', body = "This is a test review16", user_id = 4, product_id = 1)
    review17 = Review(rating = '2.9', body = "This is a test review17", user_id = 4, product_id = 3)
    review18 = Review(rating = '1.7', body = "This is a test review18", user_id = 4, product_id = 5)
    review19 = Review(rating = '1.4', body = "This is a test review19", user_id = 4, product_id = 7)
    review20 = Review(rating = '4.6', body = "This is a test review20", user_id = 4, product_id = 9)

    db.session.add_all([review1,review2,review3,review4,review5,review6,review7,review8,review9,review10,review11,review12,review13,review14,review15,review16,review17,review18,review19,review20])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
