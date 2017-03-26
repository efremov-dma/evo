from app import app
from app import response
from app.errors.errors import Error
from app.errors.exceptions import APIException


@app.errorhandler(Exception)
def api_error_handler(exception):
    if not issubclass(exception.__class__, APIException):
        error = Error(detail=str(exception))
        exception = APIException()
        exception.add_error(error)

    return response.error(exception.status, *exception.errors)
