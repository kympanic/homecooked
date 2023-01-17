from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired

## ADD CUSTOM ERROR VALIDATORS HERE

def check_rating(form,field):
    rating = form.data['rating']
    if rating.startswith('-'):
        raise ValidationError('Please choose a category')


class ReviewForm(FlaskForm):
    body = TextAreaField('review', validators=[DataRequired()])
    rating = StringField('rating', validators=[InputRequired(), check_rating])
    user_id= IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
