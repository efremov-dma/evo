from flask import Blueprint

blueprint = Blueprint('departments', __name__, url_prefix='/api/departments')

from . import models
from . import urls
from . import views
