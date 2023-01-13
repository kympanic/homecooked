from app.models import db, User, environment, SCHEMA

#  shop_name = db.Column(db.String(255), unique=True)
#     profile_img = db.Column(db.String(255), unique=True)
#     phone_number = db.Column(db.Integer(10), nullable=False, unique=True)
#     zipcode
# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', shop_name="Demo Shop", profile_img = 'https://image.tmdb.org/t/p/w500/72LCF6OLi95odUlqtDi8vAcW3zw.jpg', shop_logo_img = 'https://images-na.ssl-images-amazon.com/images/S/influencer-profile-image-prod/logo/influencer-283de61b_1555460833054._QL80_.png', shop_splash_img = 'https://media.istockphoto.com/id/535786572/photo/grilled-striploin-steak.jpg?b=1&s=612x612&w=0&k=20&c=4MAcTyBrF7XkcltOt9WpTXwM6-uuf7qWUP6-j7srefc=', phone_number = "876539333", zipcode = '92551', password='password', category='American')
    wednesdayaddams = User(
        username='wednesdayaddams', email='wednesdayadams@aa.io',shop_name="Trick or Treat?", profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/Jenna_Ortega_Merlina_Addams.webp', shop_logo_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/healthy-halloween-snacks-1.jpeg', shop_splash_img ='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/Adams-Family-Snap-Guide-2.jpeg', phone_number = "1800456696",zipcode='92555', password='password',category="Other")
    homersimpson = User(
        username='homersimpson', email='homersimpson@aa.io', shop_name='Doh! Donuts', profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/Simpsons_SO28_Gallery_11-fb0b632.jpeg', shop_logo_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/252637901_436135504594462_5886281448989624379_n.jpeg', shop_splash_img = 'https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/135742229_247761436765204_8875221857717925711_n.jpeg', phone_number = "2159976207",zipcode="92557", password='password', category="Dessert")
    ricksanchez = User(
        username='ricksanchez', email='ricksanchez@aa.io', profile_img='https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/profile+pictures/ricksanchez.webp', phone_number="5085994721", zipcode='92507', password='password')
    
    db.session.add_all([demo,wednesdayaddams,homersimpson,ricksanchez])
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
