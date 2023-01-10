from flask import Blueprint, request, redirect
from ..models import Product, db, Review
from ..utils import Print
from flask_login import login_required, current_user
from app.forms import ProductForm, ReviewForm
from werkzeug.datastructures import ImmutableMultiDict

product_routes = Blueprint('products', __name__)

#GET ALL PRODUCTS
@product_routes.route('')
def get_all_products():
    products = Product.query.all()

    res = {product.id: product.to_dict() for product in products}
 
    return res

#GET PRODUCT FROM SPECIFIC ID
@product_routes.route('/<int:id>')
def get_product_by_id(id):
    product = Product.query.get(id)

    res = {product.id: product.to_dict()}
    return res


#CREATE NEW PRODUCT
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

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(product)
      
        db.session.commit()

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
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review()
        form.populate_obj(review)

        db.session.add(review)
        db.session.commit()
        return {review.id: review.to_dict()}
    return {'errors': form.errors}
