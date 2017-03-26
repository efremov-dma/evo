from marshmallow import fields, validate

from app.schemas import ModelSchema


class DepartmentSchema(ModelSchema):
    name = fields.Str(required=True, validate=[validate.Length(max=255)])
    description = fields.Str(allow_none=True)
    head_id = fields.UUID(allow_none=True)
