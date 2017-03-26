from app.employments import blueprint
from app.employments.views import EmploymentList, EmploymentSingle

blueprint.add_url_rule('/', view_func=EmploymentList.as_view('list'))
blueprint.add_url_rule('/<id>', view_func=EmploymentSingle.as_view('single'))
