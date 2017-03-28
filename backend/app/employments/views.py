from flask import request
from sqlalchemy import desc

from app import response
from app.employments.models import Employment
from app.employments.schemas import EmploymentSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class EmploymentList(ListCreateView):
    model = Employment
    schema = EmploymentSchema

    def get(self):
        filters = []

        if 'employee_id' in request.args:
            filters.append(self.model.employee_id == request.args['employee_id'])

        data = self.model.query.order_by(desc(self.model.start_date)).filter(*filters)

        return response.success(data=data, schema=self.schema, many=True)


class EmploymentSingle(ReadUpdateDeleteView):
    model = Employment
    schema = EmploymentSchema
