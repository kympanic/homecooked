from app.models import db, Order, environment, SCHEMA

def seed_orders():
    order1 = Order(
        user_id=1, payment_id=1 )
    order2 = Order(
        user_id=2, payment_id=2)
    order3 = Order(
        user_id=3, payment_id=3)


# def seed_tweets():
#     tweet1 = Tweet(text="This is my first tweet!", user_id=1, liked_by_users=[marnie, bobbie])
#     tweet2 = Tweet(text="The sql tweet is never as good as the original :/", user_id=1)
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
