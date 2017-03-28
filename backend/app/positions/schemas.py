from marshmallow import fields, validate

from app.schemas import ModelSchema
from app.validators import not_blank


class PositionSchema(ModelSchema):
    name = fields.Str(required=True, validate=[not_blank, validate.Length(max=255)])
    description = fields.Str(required=True)
