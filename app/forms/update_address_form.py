from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class UpdateAddressForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
