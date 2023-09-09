from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
import math



def validRating(form, field):
    rating = field.data
    if rating <1 or rating > 5:
        raise ValidationError('Rating must be a value from 1 to 5')

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired(message='Rating must be a number'), validRating])
