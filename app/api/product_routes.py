from flask import Blueprint, request
from ..models import Product, Review, db
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
