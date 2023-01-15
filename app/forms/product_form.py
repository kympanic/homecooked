from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Product
## ADD CUSTOM ERROR VALIDATORS HERE


def name_length_check(form, field):
    name = form.data['email']
    if len(name) > 30:
        raise ValidationError('Name of your food must be less than 30 characters')

class ProductForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired(), ])
    name = StringField('name', validators=[DataRequired()])
    description=StringField('description', validators=[DataRequired()])
    image_url=StringField('image_url')
    price=StringField('price', validators=[DataRequired()])
    category=StringField('category', validators =[DataRequired()])
    
