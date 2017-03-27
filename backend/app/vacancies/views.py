from app.vacancies.models import Vacancy
from app.vacancies.schemas import VacancySchema
from app.views import ListCreateView, ReadUpdateDeleteView


class VacancyList(ListCreateView):
    model = Vacancy
    schema = VacancySchema


class VacancySingle(ReadUpdateDeleteView):
    model = Vacancy
    schema = VacancySchema
