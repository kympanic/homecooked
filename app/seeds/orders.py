from app.models import db, Order, environment, SCHEMA
from .products import product1,product2,product3,product4,product5,product6,product7,product8,product9
def seed_orders():
    order1 = Order(
        user_id=1, payment_id=1, products_with_order=[product4,product5,product6] )
    order2 = Order(
        user_id=2, payment_id=3, products_with_order=[product1,product2,product3])
    order3 = Order(
        user_id=3, payment_id=4, products_with_order=[product4,product2,product1])
    order4 = Order(
        user_id=1, payment_id=2, products_with_order=[product7,product8,product9])
    order5 = Order(
        user_id=2, payment_id=3, products_with_order=[product1,product2,product3])
    order6 = Order(
        user_id=3, payment_id=5, products_with_order=[product4,product5,product6])
    order7 = Order(
        user_id=4, payment_id=6, products_with_order=[product1,product5,product9])

    db.session.add_all([order1,order2,order3,order4,order5,order6,order7])
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
