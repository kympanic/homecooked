from app.models import db, Order, environment, SCHEMA

def seed_orders():
    order1 = Order(
        user_id=1, payment_id=1, products_with_order= [])
    order2 = Order(
        user_id=2, payment_id=2, products_with_order= [])
    order3 = Order(
        user_id=3, payment_id=3, products_with_order= [])

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)

    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
