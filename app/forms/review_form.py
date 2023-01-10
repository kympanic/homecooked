from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired




def rating_check(form, field):
    if field.data > 5 or field.data < 0 :
        raise ValidationError('Rating must be greater than 0 and less or equal to 5')

class ReviewForm(FlaskForm):
    body = TextAreaField('review', validators=[DataRequired()])
    rating = StringField('rating', [InputRequired(), rating_check])
    user_id= IntegerField('user_id', validators=[DataRequired()])


    # id = db.Column(db.Integer, primary_key=True)
    # rating = db.Column(db.String(10), nullable=False)
    # body = db.Column(db.String(255), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
