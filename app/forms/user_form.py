from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

## ADD CUSTOM ERROR VALIDATORS HERE

class UserForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    email = StringField('name', validators=[DataRequired()])
    shop_name=StringField('description', validators=[DataRequired()])
    profile_img=StringField('image_url')
    phone_number=StringField('price', validators=[DataRequired()])
    shop_logo_img=StringField('shop_logo_img')
    shop_splash_img=StringField('shop_splash_img')
    category=StringField('category')
    zipcode=StringField('category', validators =[DataRequired()])
    password=StringField('password',validators=[DataRequired()])
