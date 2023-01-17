from app.models import db, Product, environment, SCHEMA


product1 = Product(user_id=1, name='Gigantic Steak', description='Its a gigantic 64oz steak', image_url = 'https://www.tastingtable.com/img/gallery/15-ingredients-that-will-seriously-elevate-your-steak/l-intro-1663169111.jpg', price='30.99',category="American")
product2 = Product(user_id=1, name='Cheese Pizza', description='Wow, much cheese.', image_url = 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', price='12.99',category="American")
product3 = Product(user_id=1, name="Spaghetti and Meatballs", description="It's a spicy meatball!",image_url = 'https:www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg', price='10.95', category="Italian")
product4 = Product(user_id=2, name="Morticia's Blood Jello", description="A cherry flavored jello with a surprise twist!",image_url = 'https://images-gmi-pmc.edge-generalmills.com/cc7c80a5-53f2-4763-bbc0-47f1ad57ec98.jpg', price='6.52', category="Other")
product5 = Product(user_id=2, name="Uncle Fester's Meatloaf", description="It's meat for sure. And it's definitely not looking at you.",image_url = 'https://images.squarespace-cdn.com/content/v1/5216e267e4b0cb074c79fdb3/1446181948970-I6JI3H7LD2NLHTBSK90Y/image-asset.jpeg?format=1500w', price='3.22', category="Other")
product6 = Product(user_id=2, name="Thing's Chicken Fingers", description="Handmade chicken tenders with a side of dipping sauce",image_url = 'https://www.wellplated.com/wp-content/uploads/2021/10/Air-Fried-Chicken-Tenders.jpg', price='12.45',category="Other")
product7 = Product(user_id=3, name="Sprinkled Donut", description="A classic chocolate glazed donut with rainbow sprinkles",image_url = 'https://assets.speedway.com/images/FoodAndBeverage/InStoreItems//cafe-chocolate-sprinkle-donut.png', price='3.50',category="Dessert")
product8 = Product(user_id=3, name="Burns Vintage Donut", description="Its simply excelleeeent",image_url = 'https://cdn.cheapism.com/images/060116_crazy_doughnuts_slide_19_fs.max-784x410.jpg', price='3.50', category="Dessert")
product9 = Product(user_id=3, name="Duff Beer Donut", description="A bite of this donut will make you yell, Oh yea!",image_url = 'https://cadonuts.com/wp-content/uploads/2020/10/WHITE-STRAW.jpg', price='3.50', category="Dessert")

def seed_products():
    db.session.add_all([product1,product2,product3,product4,product5,product6,product7,product8,product9])
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
