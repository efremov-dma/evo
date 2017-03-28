from app import response
from app.departments.models import Department
from app.departments.schemas import DepartmentSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class DepartmentList(ListCreateView):
    model = Department
    schema = DepartmentSchema

    def get(self):
        data = self.model.query.order_by(self.model.name).all()

        return response.success(data=data, schema=self.schema, many=True)


class DepartmentSingle(ReadUpdateDeleteView):
    model = Department
    schema = DepartmentSchema
