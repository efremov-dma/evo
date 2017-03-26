from marshmallow import fields, validate

from app.schemas import ModelSchema


class PositionSchema(ModelSchema):
    name = fields.Str(required=True, validate=[validate.Length(max=255)])
    description = fields.Str(required=True)
