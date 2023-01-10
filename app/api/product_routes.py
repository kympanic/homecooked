from flask import Blueprint, request, redirect
from ..models import Product, db, Review
from ..utils import Print
from flask_login import login_required, current_user
<<<<<<< HEAD
from app.forms import ReviewForm

=======
from app.forms import ProductForm
from werkzeug.datastructures import ImmutableMultiDict
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5

product_routes = Blueprint('products', __name__)

#User can retrieve all products currently in the db
@product_routes.route('')
def get_all_products():
    products = Product.query.all()

    res = {product.id: product.to_dict() for product in products}

    return res

#User can get a specific product depending on id
@product_routes.route('/<int:id>')
def get_product_by_id(id):
    product = Product.query.get(id)

    res = {product.id: product.to_dict()}
    return res


#Logged in user can create a new product
#Receiving data from the React form in the frotend
#ImmutableMulti dict - saves the multiple values of a key in form of a list
@product_routes.route('',methods=['POST'])
@login_required
def  add_product():
    form = ProductForm()

    Print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product()
        form.populate_obj(product)

        db.session.add(product)
        db.session.commit()
        return {product.id: product.to_dict()}
    return {'errors': form.errors}
    

#Logged in user can edit a product only if they are owner of the product
@product_routes.route('/<int:id>', methods = ["PATCH", "PUT"])
@login_required
def edit_product(id):
    
    product = Product.query.get(id)
    form = ProductForm()
    
    Print(form.data)
 
    if form.data["user_id"] != current_user.id:
        return {'error': "You are not authorized to edit this product"}, 401

<<<<<<< HEAD
    if data.get('name'):
        product.name = data['name']
    if data.get('description'):
        product.description = data['description']
    if data.get('image_url'):
        product.image_url = data['image_url']
    if data.get('price'):
        product.price = data['price']

    db.session.commit()
=======
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(product)
      
        db.session.commit()
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5

    return {product.id: product.to_dict()}


#User can delete from product id if they own the product
@product_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_product(id):
    data = request.json

    product = Product.query.get(id)
    if product.user_id != current_user.id:
        return {'error': "You are not authorized to delete this product"}, 401


    db.session.delete(product)
    db.session.commit()

    return {"msg": "Successfully deleted the product"}

# User can retrieve all reviews for a specific product id
# GET api/products/:id/reviews
@product_routes.route('/<int:id>/reviews', methods = ['GET'])
def get_reviews(id):
    #get reviews by product id
    reviews = Review.query.filter(Review.product_id == id).all()
    Print(reviews)

    res = {review.id: review.to_dict() for review in reviews}
    Print(res)
    return res

# User can post a review on a food item
# POST api/products/:id/reviews
@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    # form = ReviewForm()
    review_text = request.json

    if review_text["user_id"] != current_user.id:
        return {"error": "You are not authorized to create a review"}, 401

    # need to check if user has an existing review


    new_review = Review(**review_text)
    db.session.add(new_review)
    db.session.commit()

    return {new_review.id: new_review.to_dict()}

##form POST review
# @product_routes.route('/<int:id>/reviews', method=['POST'])
# @login_required
# def createReview(id):
#         form = ReviewForm()
#         review = Review()
#         form.populate_obj(review)

#         db.session.add(review)
#         db.session.commit()
#         return redirect(f'/products/{id}')
