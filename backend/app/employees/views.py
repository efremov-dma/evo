from flask import request

from app import response, db
from app.employees.models import Employee
from app.employees.schemas import EmployeeSchema
from app.employments.models import Employment
from app.views import ListCreateView, ReadUpdateDeleteView, BaseView, validate_id


class EmployeeList(ListCreateView):
    model = Employee
    schema = EmployeeSchema

    def get(self):
        if 'department_id' in request.args:
            data = self.model.query \
                .join(self.model.current_employment) \
                .filter_by(department_id=request.args['department_id'])
        else:
            data = self.model.query.all()

        return response.success(data=data, schema=self.schema, many=True)


class EmployeeSingle(ReadUpdateDeleteView):
    model = Employee
    schema = EmployeeSchema


class EmployeeDismiss(BaseView):
    model = Employee
    schema = EmployeeSchema
    methods = ['POST']

    @validate_id
    def post(self, id):
        employee = self.model.get_or_404(id)

        if employee.current_employment:
            employee.current_employment_id = None

            if employee.current_employment.department.head_id == employee.id:
                employee.current_employment.department.head_id = None

            db.session.commit()

        return response.success(data=employee, schema=self.schema)
