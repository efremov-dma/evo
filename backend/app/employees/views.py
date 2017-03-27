from flask import request

from app import response
from app.employees.models import Employee
from app.employees.schemas import EmployeeSchema
from app.employments.models import Employment
from app.views import ListCreateView, ReadUpdateDeleteView


class EmployeeList(ListCreateView):
    model = Employee
    schema = EmployeeSchema

    def get(self):
        if 'department_id' in request.args:
            data = self.model.query\
                .join(self.model.current_employment)\
                .filter_by(department_id=request.args['department_id'])
        else:
            data = self.model.query.all()

        return response.success(data=data, schema=self.schema, many=True)


class EmployeeSingle(ReadUpdateDeleteView):
    model = Employee
    schema = EmployeeSchema
