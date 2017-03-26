from marshmallow import fields, validate

from app.schemas import ModelSchema


class EmployeeSchema(ModelSchema):
    first_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    last_name = fields.Str(required=True, validate=[validate.Length(max=255)])
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
