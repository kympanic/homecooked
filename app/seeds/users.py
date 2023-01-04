from app.models import db, User, environment, SCHEMA

#  shop_name = db.Column(db.String(255), unique=True)
#     profile_img = db.Column(db.String(255), unique=True)
#     phone_number = db.Column(db.Integer(10), nullable=False, unique=True)
#     zipcode
# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', shop_name="Yummy Shop", profile_img = 'https://www.pexels.com/photo/man-smiling-behind-wall-220453/',phone_number = 876539333, zipcode = 124555, password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io',shop_name="Poo Poo Shop", profile_img='https://www.pexels.com/photo/silhouette-photo-of-woman-holding-lights-3792581/',phone_number = 1800456696,zipcode=233456, password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', shop_name="Moo Moo Shop", profile_img='https://www.shutterstock.com/image-photo/happy-laughing-baby-wearing-yellow-260nw-390443464.jpg',phone_number = 1800456696,zipcode=233456, password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
