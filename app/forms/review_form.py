from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Review

class ReviewForm(FlaskForm):
    body = TextAreaField('review', validators=[DataRequired()])
    rating = StringField(
        'rating', validators=[DataRequired(),])


    # id = db.Column(db.Integer, primary_key=True)
    # rating = db.Column(db.String(10), nullable=False)
    # body = db.Column(db.String(255), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
