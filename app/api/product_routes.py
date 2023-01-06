from flask import Blueprint, request
from ..models import Product, db
from ..utils import Print
from flask_login import login_required, current_user


product_routes = Blueprint('products', __name__)

@product_routes.route('')
def get_all_products():
    products = Product.query.all()

    res = {product.id: product.to_dict() for product in products}
    
    return res


@product_routes.route('/<int:id>')
def get_product_by_id(id):
    product = Product.query.get(id)

    res = {product.id: product.to_dict()}
    return res

@product_routes.route('',methods=['POST'])
@login_required
def  add_product():
    product_data = request.json
    Print(product_data)

    new_product = Product(**product_data, user_id = current_user.id)

    db.session.add(new_product)
    db.session.commit()

    return {new_product.id: new_product.to_dict()}

@product_routes.route('/<int:id>', methods = ["PATCH", "PUT"])
@login_required
def edit_product(id):
    product = Product.query.get(id)
    data = request.json

    Print(data)

    if product.user_id != current_user.id:
        return {'error': "You are not authorized to edit this product"}, 401

    if data.get('name'):
        product.name = data['name']
    if data.get('description'):
        product.description = data['description']
    if data.get('image_url'):
        product.image_url = data['image_url']
    if data.get('price'):
        product.price = data['price']
    
    db.session.add(product)
    db.session.commit()

    return {product.id: product.to_dict()}

@product_routes.route('/<int:id>', methods = ["DELETE"])
def delete_product(id):
    data = request.json
    
    product = Product.query.get(id)
    if product.user_id != current_user.id:
        return {'error': "You are not authorized to delete this product"}, 401


    db.session.delete(product)
    db.session.commit()

    return {"msg": "Successfully deleted the product"}