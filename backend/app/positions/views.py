from app.positions.models import Position
from app.positions.schemas import PositionSchema
from app.views import ListCreateView, ReadUpdateDeleteView


class PositionList(ListCreateView):
    model = Position
    schema = PositionSchema


class PositionSingle(ReadUpdateDeleteView):
    model = Position
    schema = PositionSchema
