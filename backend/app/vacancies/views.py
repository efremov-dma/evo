from flask import request

from app import response
from app.vacancies.models import Vacancy
from app.vacancies.schemas import VacancySchema
from app.views import ListCreateView, ReadUpdateDeleteView


class VacancyList(ListCreateView):
    model = Vacancy
    schema = VacancySchema

    def get(self):
        if 'department_id' in request.args:
            data = self.model.filter_by(department_id=request.args['department_id'])
        else:
            data = self.model.query.all()

        return response.success(data=data, schema=self.schema, many=True)


class VacancySingle(ReadUpdateDeleteView):
    model = Vacancy
    schema = VacancySchema
