from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.api.aws import ALLOWED_EXTENSIONS

def min_price(form, field):
    # Checks if price is $0.00 or more
    price = field.data

    if price <= 0:
        raise ValidationError("Price must be more than $0.00")
    
def max_characters(form, field):
    #Checks for number of characters
    val = field.data

    if len(val) > 50:
        raise ValidationError("Name cannot be more than 50 characters")


class MenuItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), max_characters])
    description = StringField('description')
    price = FloatField('price', validators=[DataRequired(), min_price])
    category = StringField('category', validators=[DataRequired()])
    dietary = StringField('dietary')
    image_url = FileField("Image File", validators=[
                           FileAllowed(list(ALLOWED_EXTENSIONS))])
