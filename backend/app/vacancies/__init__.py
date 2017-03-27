from flask import Blueprint

blueprint = Blueprint('vacancies', __name__, url_prefix='/api/vacancies')

from . import models
from . import urls
from . import views
