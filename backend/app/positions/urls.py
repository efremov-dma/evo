from app.positions import blueprint
from app.positions.views import PositionList, PositionSingle

blueprint.add_url_rule('/', view_func=PositionList.as_view('list'))
blueprint.add_url_rule('/<id>', view_func=PositionSingle.as_view('single'))
