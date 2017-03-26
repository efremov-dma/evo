from marshmallow import Schema, fields

from app.errors.errors import InvalidAttribute
from app.errors.exceptions import BadRequest


class ModelSchema(Schema):
    id = fields.Str(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    def validate(self, data, many=None, partial=None):
        errors = super().validate(data, many=many, partial=partial)
        if errors:
            exception = BadRequest()
            for attr, messages in errors.items():
                for msg in messages:
                    exception.add_error(InvalidAttribute(source=attr, detail=msg))
            raise exception


class ErrorSchema(Schema):
    title = fields.Str(dump_only=True)
    detail = fields.Str(dump_only=True)
    code = fields.Int(dump_only=True)
    source = fields.Str(dump_only=True)
