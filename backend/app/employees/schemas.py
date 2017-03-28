from marshmallow import ValidationError
from marshmallow import fields, validate
from marshmallow import validates

from app.departments.models import Department
from app.employments.models import Employment
from app.errors.exceptions import NotFound
from app.positions.models import Position
from app.schemas import ModelSchema
from app.vacancies.models import Vacancy
from app.validators import not_blank, phone_number


class EmployeeSchema(ModelSchema):
    first_name = fields.Str(required=True, validate=[not_blank, validate.Length(max=255)])
    last_name = fields.Str(required=True, validate=[not_blank, validate.Length(max=255)])
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True, validate=[phone_number])
    department_id = fields.UUID(load_only=True)
    position_id = fields.UUID(required=True, load_only=True)
    vacancy_id = fields.UUID(required=True, load_only=True)
    current_employment_id = fields.UUID(allow_none=True, dump_only=True)

    @validates('department_id')
    def validate_department_id(self, department_id):
        try:
            Department.get_or_404(department_id.hex)
        except NotFound:
            raise ValidationError('Department does not exist.')

    @validates('current_employment_id')
    def validate_employment_id(self, employment_id):
        try:
            Employment.get_or_404(employment_id.hex)
        except NotFound:
            raise ValidationError('Employment does not exist.')

    @validates('position_id')
    def validate_position_id(self, position_id):
        try:
            Position.get_or_404(position_id.hex)
        except NotFound:
            raise ValidationError('Position does not exist.')

    @validates('vacancy_id')
    def validate_vacancy_id(self, vacancy_id):
        try:
            Vacancy.get_or_404(vacancy_id.hex)
        except NotFound:
            raise ValidationError('Vacancy does not exist.')
