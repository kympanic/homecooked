from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,ValidationError


# ADD CUSTOM VALIDATORS HERE

class OrderForm(FlaskForm):
    payment_id = IntegerField('payment', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])