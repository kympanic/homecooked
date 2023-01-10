from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

## ADD CUSTOM ERROR VALIDATORS HERE

class ProductForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description=StringField('description', validators=[DataRequired()])
    image_url=StringField('image_url')
    price=StringField('price', validators=[DataRequired()])
    
