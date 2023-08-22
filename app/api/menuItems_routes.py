

from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import MenuItems

user_routes = Blueprint('menuItems', __name__)
