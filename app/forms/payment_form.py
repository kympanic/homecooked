from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError, Length
from ..utils import Print
## ADD CUSTOM ERROR VALIDATORS HERE

def provider_check(form,field):
    provider=field.data
    if (provider=="--"):
        raise ValidationError('Provide valid provider')
    
def expiration_check(form,field):
    expiration=field.data
    if len(expiration) < 4:
        raise ValidationError('Provide valid expiration date')

class PaymentForm(FlaskForm):
    user_id=IntegerField('user_id', validators=[DataRequired()])
    provider = StringField('provider', validators=[DataRequired(),provider_check])
    account_number=StringField('account_number', validators=[DataRequired(), Length(min=16,message="Please provide a valid account number")])
    expiration=StringField('expiration', validators=[DataRequired(),expiration_check])

    
