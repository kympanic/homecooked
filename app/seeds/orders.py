from app.models import db, Order, environment, SCHEMA

def seed_orders():
    order1 = Order(
        user_id=1, payment_id=1)
    order2 = Order(
        user_id=2, payment_id=3 )
    order3 = Order(
        user_id=3, payment_id=4)
    order4 = Order(
        user_id=1, payment_id=2)
    order5 = Order(
        user_id=2, payment_id=3)
    order6 = Order(
        user_id=3, payment_id=5)
    order7 = Order(
        user_id=4, payment_id=6)

    db.session.add_all([order1,order2,order3,order4,order5,order6,order7])
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
