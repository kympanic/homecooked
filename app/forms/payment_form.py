from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError

## ADD CUSTOM ERROR VALIDATORS HERE

class PaymentForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired()])
    provider = StringField('provider', validators=[DataRequired()])
    account_number=StringField('account_number', validators=[DataRequired()])
    expiration=StringField('expiration', validators=[DataRequired()])
    
