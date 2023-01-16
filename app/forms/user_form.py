from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL, Length,InputRequired
from app.models import User

## ADD CUSTOM ERROR VALIDATORS HERE


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


# def user_exists(form, field):
#     # Checking if email exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')

# def shopname_exists(form, field):
#     # Checking if user exists
#     shopname = field.data
#     user = User.query.filter(User.shop_name == shopname).first()
#     if user:
#         raise ValidationError('Shop name is already in use.')

# def phonenumber_exists(form,field):
#     phonenumber = field.data
#     user = User.query.filter(User.phone_number == phonenumber).first()
#     if user:
#         raise ValidationError('Phone number is already in use.')

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