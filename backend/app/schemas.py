from marshmallow import Schema, fields


class ModelSchema(Schema):
    id = fields.Str(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    def validate(self, data, many=None, partial=None):
        """
        :param many:
        :param data:
        :param bool|tuple partial: Whether to ignore missing fields. If its value is an iterable,
            only missing fields listed in that iterable will be ignored.
        """
        errors = super().validate(data, many=many, partial=partial)
        if errors:
            # todo: custom API bad request exception.
            raise Exception('Validation error.')


class ErrorSchema(Schema):
    title = fields.Str(dump_only=True)
    detail = fields.Str(dump_only=True)
    code = fields.Int(dump_only=True)
    source = fields.Str(dump_only=True)
