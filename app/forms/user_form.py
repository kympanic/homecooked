from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

## ADD CUSTOM ERROR VALIDATORS HERE

class UserForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    shop_name=StringField('shop_name')
    profile_img=StringField('profile_img')
    phone_number=StringField('phone_number', validators=[DataRequired()])
    shop_logo_img=StringField('shop_logo_img')
    shop_splash_img=StringField('shop_splash_img')
    category=StringField('category')
    zipcode=StringField('zipcode', validators =[DataRequired()])