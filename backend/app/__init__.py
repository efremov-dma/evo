from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/dist', static_folder='../../frontend/dist')

app.config.from_object('app.settings.base')

db = SQLAlchemy()
db.init_app(app)
Migrate(app, db)

from . import errors
from . import employments
from . import employees
from . import departments
from . import positions
from . import vacancies
from . import views

from app.departments import blueprint as department_blueprint
from app.employees import blueprint as employee_blueprint
from app.employments import blueprint as employment_blueprint
from app.positions import blueprint as position_blueprint

app.register_blueprint(department_blueprint)
app.register_blueprint(employee_blueprint)
app.register_blueprint(employment_blueprint)
app.register_blueprint(position_blueprint)
