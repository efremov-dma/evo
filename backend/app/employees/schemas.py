from marshmallow import ValidationError
from marshmallow import fields, validate
from marshmallow import validates

from app.employments.models import Employment
from app.errors.exceptions import NotFound
from app.schemas import ModelSchema


class EmployeeSchema(ModelSchema):
    first_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    last_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    current_employment_id = fields.UUID(allow_none=True)

    @validates('current_employment_id')
    def validate_employment_id(self, employment_id):
        try:
            Employment.get_or_404(employment_id.hex)
        except NotFound:
            raise ValidationError('Employments does not exist.')

