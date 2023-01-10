from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        user_id=1, name='Burrito', description='Melt in your mouth goodness', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='12.50')
<<<<<<< HEAD
    product2 = Product(
        user_id=2, name='Sushi', description='Hits the umami spot', image_url = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2270&q=80', price='13.50')
    product3 = Product(
        user_id=3, name='Pizza', description='Deep dish goodness', image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', price='6.99')

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)

=======
    product2 = Product(user_id=1, name='Tacos', description='soft tacos', image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='5.50')
    product3 = Product(user_id=2, name="Spaghetti", description="this is spaghetti",image_url = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/', price='11.52')
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
