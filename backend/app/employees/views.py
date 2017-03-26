from app.employees.models import Employee
from app.employees.schemas import EmployeeSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class EmployeeList(ListCreateView):
    model = Employee
    schema = EmployeeSchema


class EmployeeSingle(ReadUpdateDeleteView):
    model = Employee
    schema = EmployeeSchema
