from .db import db

product_orders = db.Table(
    "product_orders",
    db.Model.metadata,
    db.Column('products', db.Integer, db.ForeignKey('products.id'), primary_key=True, nullable=False),
    db.Column('orders', db.Integer, db.ForeignKey('orders.id'), primary_key=True, nullable=False)
)