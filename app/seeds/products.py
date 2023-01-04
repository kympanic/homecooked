from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        user_id=1, name='Burrito', description='Melt in your mouth goodness', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/',profile_img = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', avg_rating = 1.2, price=12.50)
    # marnie = User(
    #     username='marnie', email='marnie@aa.io',shop_name="Poo Poo Shop", profile_img='https://www.pexels.com/photo/silhouette-photo-of-woman-holding-lights-3792581/',phone_number = 1800456696,zipcode=233456, password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', shop_name="Moo Moo Shop", profile_img='https://www.shutterstock.com/image-photo/happy-laughing-baby-wearing-yellow-260nw-390443464.jpg',phone_number = 1800456696,zipcode=233456, password='password')

    db.session.add(product1)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
