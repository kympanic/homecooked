from flask import Blueprint, request
from ..models import Product, db
from ..utils import Print


product_routes = Blueprint('products', __name__)

@product_routes.route('')
def get_all_products():
    products = Product.query.all()
    Print(products)

    res = {product.id: product.to_dict() for product in products}
    return res