from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def price_range(form, field):
    price_range = field.data
    if price_range not in ["$", "$$", "$$$", "$$$$"]:
        raise ValidationError("Valid inputs are $, $$, $$$, $$$$")


class RestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    description = StringField('description')
    cuisine = StringField('cuisine', validators=[DataRequired()])
    dietary = StringField('dietary')
    price_range = StringField('price_range', validators=[
                              DataRequired(), price_range])
    opens_at = StringField('opens_at', validators=[DataRequired()])
    closes_at = StringField('closes_at', validators=[DataRequired()])
    image_url = StringField('image_url')
