from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        user_id=1, name='Burrito', description='Melt in your mouth goodness', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='12.99')
    product2 = Product(user_id=1, name='Tacos', description='soft tacos', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='6.85')
    product3 = Product(user_id=2, name="Spaghetti", description="this is spaghetti",image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='11.52')
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
