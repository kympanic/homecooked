from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product
## ADD CUSTOM ERROR VALIDATORS HERE
# def check_name(form, field):
#     # Checking if user exists
#     name = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')




class ProductForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description=StringField('description', validators=[DataRequired()])
    image_url=StringField('image_url')
    price=StringField('price', validators=[DataRequired()])
    category=StringField('category', validators =[DataRequired()])
    
