from app.departments import blueprint
from app.departments.views import DepartmentList, DepartmentSingle

blueprint.add_url_rule('/', view_func=DepartmentList.as_view('list'))
blueprint.add_url_rule('/<id>', view_func=DepartmentSingle.as_view('single'))
