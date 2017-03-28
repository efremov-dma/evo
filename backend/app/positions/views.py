from app import response
from app.positions.models import Position
from app.positions.schemas import PositionSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class PositionList(ListCreateView):
    model = Position
    schema = PositionSchema

    def get(self):
        data = self.model.query.order_by(self.model.name).all()

        return response.success(data=data, schema=self.schema, many=True)


class PositionSingle(ReadUpdateDeleteView):
    model = Position
    schema = PositionSchema
