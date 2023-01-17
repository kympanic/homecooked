from .db import db, environment, SCHEMA, add_prefix_for_prod

product_orders = db.Table(
    "product_orders",
    db.Model.metadata,
    db.Column('products', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True, nullable=False),
    db.Column('orders', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True, nullable=False)
)
if environment == "production":
    product_orders.schema = SCHEMA