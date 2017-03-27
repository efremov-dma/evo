from app.vacancies import blueprint
from app.vacancies.views import VacancyList, VacancySingle

blueprint.add_url_rule('/', view_func=VacancyList.as_view('list'))
blueprint.add_url_rule('/<id>', view_func=VacancySingle.as_view('single'))
