from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired
from app.api.aws import ALLOWED_EXTENSIONS


class MenuItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    price = FloatField('price', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    dietary = StringField('dietary')
    image_url = FileField("Image File", validators=[
                           FileAllowed(list(ALLOWED_EXTENSIONS))])
