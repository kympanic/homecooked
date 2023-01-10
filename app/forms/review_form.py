from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired
from ..utils import Print

def rating_check(form, field):
    rating_number = float(field.data)
    if rating_number > 5 or rating_number< 0 :
        raise ValidationError('Rating must be greater than 0 and less or equal to 5')

class ReviewForm(FlaskForm):
    body = TextAreaField('review', validators=[DataRequired()])
    rating = StringField('rating', [InputRequired(), rating_check])
    user_id= IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
