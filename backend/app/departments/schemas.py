from flask import request
from marshmallow import ValidationError
from marshmallow import fields, validate
from marshmallow import post_load
from marshmallow import validates

from app.employees.models import Employee
from app.errors.errors import InvalidAttribute
from app.errors.exceptions import NotFound, BadRequest
from app.schemas import ModelSchema


class DepartmentSchema(ModelSchema):
    name = fields.Str(required=True, validate=[validate.Length(max=255)])
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

    @post_load
    def uuid_to_hex(self, item):
        uuid = item.get('head_id')
        if uuid:
            item['head_id'] = uuid.hex
        return item
