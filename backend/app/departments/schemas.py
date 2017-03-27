from flask import request
from marshmallow import ValidationError
from marshmallow import fields, validate
from marshmallow import validates

from app.employees.models import Employee
from app.errors.exceptions import NotFound
from app.schemas import ModelSchema
from app.validators import not_blank


class DepartmentSchema(ModelSchema):
    name = fields.Str(required=True, validate=[not_blank, validate.Length(max=255)])
    description = fields.Str(allow_none=True)
    head_id = fields.UUID(allow_none=True)

    @validates('head_id')
    def validate_head_id(self, head_id):
        if not head_id:
            return True
        try:
            employee = Employee.get_or_404(head_id.hex)
        except NotFound:
            raise ValidationError('Employee does not exist.')

        if not employee.works_in_department(request.view_args.get('id')):
            raise ValidationError('Employee does not work in this department.')

