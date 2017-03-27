from marshmallow import ValidationError
from marshmallow import fields
from marshmallow import validates
from marshmallow import validates_schema

from app.departments.models import Department
from app.departments.schemas import DepartmentSchema
from app.employees.models import Employee
from app.employees.schemas import EmployeeSchema
from app.errors.exceptions import NotFound
from app.positions.models import Position
from app.positions.schemas import PositionSchema
from app.schemas import ModelSchema


class EmploymentSchema(ModelSchema):
    department_id = fields.UUID(required=True)
    employee_id = fields.UUID(required=True)
    position_id = fields.UUID(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True, allow_none=True)
    employee = fields.Nested(EmployeeSchema, dump_only=True)
    position = fields.Nested(PositionSchema, dump_only=True)
    department = fields.Nested(DepartmentSchema, dump_only=True)

    @validates_schema
    def validate_dates(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if end_date and start_date > end_date:
            raise ValidationError('Start date cannot be later than the end date.', field_names=['start_date'])

    @validates('department_id')
    def validate_department_id(self, department_id):
        try:
            Department.get_or_404(department_id.hex)
        except NotFound:
            raise ValidationError('Department does not exist.')

    @validates('employee_id')
    def validate_employee_id(self, employee_id):
        try:
            Employee.get_or_404(employee_id.hex)
        except NotFound:
            raise ValidationError('Employee does not exist.')

    @validates('position_id')
    def validate_position_id(self, position_id):
        try:
            Position.get_or_404(position_id.hex)
        except NotFound:
            raise ValidationError('Position does not exist.')
