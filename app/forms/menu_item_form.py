from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class MenuItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    price = FloatField('price', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    dietary = StringField('dietary')
    image_url = StringField('image_url')
