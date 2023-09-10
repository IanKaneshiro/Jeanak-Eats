from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def phone_number_exists(form, field):
    # Checking of phone_number is already in use
    phone_number = field.data
    user = User.query.filter(User.phone_number == phone_number).first()
    if user:
        raise ValidationError('Phone number already in use.')


class SignUpForm(FlaskForm):

    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    phone_number = StringField(
        'phone', validators=[DataRequired(), phone_number_exists])
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')
    country = StringField('country')
    password = StringField('password', validators=[
                           DataRequired(), Length(min=6, max=20)])
    image_url = StringField('image_url', validators=[DataRequired()])
