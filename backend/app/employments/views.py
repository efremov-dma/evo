from flask import request

from app import response
from app.employments.models import Employment
from app.employments.schemas import EmploymentSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class EmploymentList(ListCreateView):
    model = Employment
    schema = EmploymentSchema

    def get(self):
        if 'employee_id' in request.args:
            data = self.model.filter_by(employee_id=request.args['employee_id'])
        else:
            data = self.model.query.all()

        return response.success(data=data, schema=self.schema, many=True)


class EmploymentSingle(ReadUpdateDeleteView):
    model = Employment
    schema = EmploymentSchema
