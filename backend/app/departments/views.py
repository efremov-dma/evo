from app.departments.models import Department
from app.departments.schemas import DepartmentSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class DepartmentList(ListCreateView):
    model = Department
    schema = DepartmentSchema


class DepartmentSingle(ReadUpdateDeleteView):
    model = Department
    schema = DepartmentSchema
