from app.employments.models import Employment
from app.employments.schemas import EmploymentSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class EmploymentList(ListCreateView):
    model = Employment
    schema = EmploymentSchema


class EmploymentSingle(ReadUpdateDeleteView):
    model = Employment
    schema = EmploymentSchema
