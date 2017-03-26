from flask import Blueprint

blueprint = Blueprint('employments', __name__, url_prefix='/employments')

from . import models
from . import urls
from . import views
