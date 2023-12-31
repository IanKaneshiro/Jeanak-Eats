from flask_wtf import FlaskForm
from sqlalchemy import or_
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    user = User.query.filter(or_(
        User.email == credential, User.phone_number == credential)).first()
    if not user:
        raise ValidationError('Invalid credentials')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(or_(
        User.email == credential, User.phone_number == credential)).first()
    if not user:
        raise ValidationError('Invalid password')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[
        DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
