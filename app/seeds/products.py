from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        user_id=1, name='Burrito', description='Melt in your mouth goodness', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='12.50')
  
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
