from datetime import datetime

from flask import request

from app import response, db
from app.departments.models import Department
from app.employees.models import Employee
from app.employees.schemas import EmployeeSchema
from app.employments.models import Employment
from app.positions.models import Position
from app.vacancies.models import Vacancy
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

    def post(self):
        self._validate_schema()

        position = Position.get_or_404(request.json.pop('position_id'))

        vacancy = Vacancy.get_or_404(request.json.pop('vacancy_id'))
        vacancy.closing_date = datetime.now()

        employee = self.model.create(**request.json)
        employment = Employment.create(
            employee=employee,
            position=position,
            start_date=datetime.now(),
            department=vacancy.department)
        db.session.commit()

        employee.current_employment_id = employment.id
        db.session.commit()

        return response.success(data=employee, schema=self.schema)


class EmployeeSingle(ReadUpdateDeleteView):
    model = Employee
    schema = EmployeeSchema

    @validate_id
    def put(self, id):
        self._validate_schema(partial=True)

        position = Position.get_or_404(request.json.pop('position_id'))
        department = Department.get_or_404(request.json.pop('department_id'))
        employee = self.model.get_or_404(id)

        curr_employment = employee.current_employment

        # Set new employment for currently unemployed employee.
        if not curr_employment:
            new_employment = Employment.create(
                position=position,
                department=department,
                employee=employee,
                start_date=datetime.now())
            db.session.commit()
            employee.current_employment_id = new_employment.id

        # If current position or department changed.
        elif (curr_employment.position_id, curr_employment.department_id) != (position.id, department.id):
            # Close current employment.
            curr_employment.end_date = datetime.now()
            # Unset department head.
            if curr_employment.department_id != department.id and curr_employment.department.head_id == employee.id:
                curr_employment.department.head_id = None

            # Set new employment as current.
            new_employment = Employment.create(
                position=position,
                department=department,
                employee=employee,
                start_date=datetime.now())
            db.session.commit()
            employee.current_employment_id = new_employment.id

        # Update attributes.
        employee.update(request.json)
        db.session.commit()

        return response.success(data=employee, schema=self.schema)


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
