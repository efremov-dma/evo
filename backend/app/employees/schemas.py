from marshmallow import ValidationError
from marshmallow import fields, validate
from marshmallow import validates

from app.employments.models import Employment
from app.errors.exceptions import NotFound
from app.positions.models import Position
from app.schemas import ModelSchema
from app.vacancies.models import Vacancy


class EmployeeSchema(ModelSchema):
    first_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    last_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    position_id = fields.UUID(required=True, load_only=True)
    vacancy_id = fields.UUID(required=True, load_only=True)
    current_employment_id = fields.UUID(allow_none=True, dump_only=True)

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


