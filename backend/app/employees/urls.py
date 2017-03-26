from app.employees import blueprint
from app.employees.views import EmployeeList, EmployeeSingle

blueprint.add_url_rule('/', view_func=EmployeeList.as_view('list'))
blueprint.add_url_rule('/<id>', view_func=EmployeeSingle.as_view('single'))
