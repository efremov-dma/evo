from uuid import UUID

from flask import request
from flask.views import MethodView

from app import db, app
from app import response
from app.errors.errors import Error
from app.errors.exceptions import NotFound, BadRequest
from app.models import BaseModel
from app.schemas import ModelSchema


def validate_id(func):
    def wrapper(self, id):
        try:
            UUID(id)
        except ValueError:
            raise NotFound()
        return func(self, id)

    return wrapper


class BaseView(MethodView):
    model = None  # type: BaseModel
    schema = None  # type: ModelSchema

    def _validate_schema(self, partial=None):
        try:
            json = request.get_json()
        except Exception as e:
            raise BadRequest(Error(detail=str(e)))
        self.schema().validate(json, partial=partial)


class ReadUpdateDeleteView(BaseView):
    methods = ['GET', 'PUT', 'DELETE']

    @validate_id
    def get(self, id):
        return response.success(data=self.model.get_or_404(id), schema=self.schema)

    @validate_id
    def put(self, id):
        self._validate_schema(partial=True)

        instance = self.model.get_or_404(id)
        instance.update(request.json)
        db.session.commit()

        return response.success(data=instance, schema=self.schema)

    @validate_id
    def delete(self, id):
        self.model.get_or_404(id).delete()
        db.session.commit()

        return response.success()


class ListCreateView(BaseView):
    methods = ['GET', 'POST']

    def get(self):
        data = self.model.query.all()

        return response.success(data=data, schema=self.schema, many=True)

    def post(self):
        self._validate_schema()

        instance = self.model.create(**request.json)
        db.session.commit()

        return response.success(data=instance, schema=self.schema)


@app.route('/', methods=['GET'])
@app.route('/<path:path>', methods=['GET'])
def home_page(path=None):
    return app.send_static_file('index.html')
