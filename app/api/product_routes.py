from flask import Blueprint, request, redirect
from ..models import Product, db, Review
from ..utils import Print
from flask_login import login_required, current_user
from app.forms import ProductForm, ReviewForm

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

#POST NEW PRODUCT
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
    

#EDIT A PRODUCT BASED ON ID
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


#DELETE A PRODUCT BASED ON PRODUCT REVIEW
@product_routes.route('/<int:id>', methods = ["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)

    if product.user_id != current_user.id:
        return {'error': "You are not authorized to delete this product"}, 401

    db.session.delete(product)
    db.session.commit()

    return {"msg": "Successfully deleted the product"}

# POST REVIEW ON PRODUCT BASED ON PRODUCT ID
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
