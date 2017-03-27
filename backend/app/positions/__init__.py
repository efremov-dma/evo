from flask import Blueprint

blueprint = Blueprint('positions', __name__, url_prefix='/api/positions')

from . import models
from . import urls
from . import views
