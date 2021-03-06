from datetime import datetime

from flask import request

from app import response
from app.vacancies.models import Vacancy
from app.vacancies.schemas import VacancySchema
from app.views import ListCreateView, ReadUpdateDeleteView


class VacancyList(ListCreateView):
    model = Vacancy
    schema = VacancySchema

    def get(self):
        filters = []

        if 'department_id' in request.args:
            filters.append(self.model.department_id == request.args['department_id'])

        if 'open' in request.args:
            filters.append(self.model.closing_date == None)

        data = self.model.query.order_by(self.model.opening_date).filter(*filters)

        return response.success(data=data, schema=self.schema, many=True)


class VacancySingle(ReadUpdateDeleteView):
    model = Vacancy
    schema = VacancySchema
