from flask import Blueprint

blueprint = Blueprint('departments', __name__, url_prefix='/departments')

from . import models
from . import urls
from . import views
