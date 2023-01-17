from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Product



def name_length_check(form, field):
    name = form.data['name']
    if len(name) > 30:
        raise ValidationError('Name of your food must be less than 30 characters')

def check_category(form,field):
    category = form.data['category']
    if category.startswith('-'):
        raise ValidationError('Please choose a category')

def check_price(form,field):
    price = form.data['price']
    price_lowercase = price.lower()
    contains_letters=price_lowercase.islower()
    if(contains_letters):
        raise ValidationError('Provide a valid price')
    if price.count(".") > 1:
        raise ValidationError('Provide a valid price')


class ProductForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired(), ])
    name = StringField('name', validators=[DataRequired(),name_length_check])
    description=StringField('description', validators=[DataRequired()])
    image_url=StringField('image_url', validators=[URL(require_tld=True,message="Please provide a valid url")])
    price=StringField('price', validators=[DataRequired(), check_price])
    category=StringField('category', validators =[DataRequired(),check_category])
    
