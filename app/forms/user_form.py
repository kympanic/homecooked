from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import User

def check_category(form,field):
    category = form.data['category']
    if category.startswith('-'):
        raise ValidationError('Please choose a category')

def validate_image(form,field):
    if field.data == field.default:
        return True
    url_validator = URL()
    return url_validator(form,field)

class UserForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    shop_name=StringField('shop_name', validators=[DataRequired(),InputRequired()])
    profile_img=StringField('profile_img')
    phone_number=StringField('phone_number', validators=[DataRequired()])
    shop_logo_img=StringField('shop_logo_img', validators=[validate_image])
    shop_splash_img=StringField('shop_splash_img', validators=[validate_image])
    category=StringField('category', validators=[check_category])
    zipcode=StringField('zipcode', validators =[DataRequired(), Length(min=5,max=5,message="Please provide a valid zipcode")])