from marshmallow import fields

from app.departments.schemas import DepartmentSchema
from app.positions.schemas import PositionSchema
from app.schemas import ModelSchema


class VacancySchema(ModelSchema):
    department_id = fields.UUID(required=True)
    position_id = fields.UUID(required=True)
    opening_date = fields.Date(required=True)
    closing_date = fields.Date(required=True, allow_none=True)
    department = fields.Nested(DepartmentSchema, dump_only=True)
    position = fields.Nested(PositionSchema, dump_only=True)
