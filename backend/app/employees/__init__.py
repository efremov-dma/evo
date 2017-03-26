from flask import Blueprint

blueprint = Blueprint('employees', __name__, url_prefix='/employees')

from . import models
from . import urls
from . import views
