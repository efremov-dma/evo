from app.errors.errors import Error


class APIException(Exception):
    status = 503
    errors = []

    def __init__(self, *errors, status=None):
        super().__init__()
        self.errors = list(errors)
        if status is not None:
            self.status = status

    def add_error(self, error: Error):
        self.errors.append(error)


class BadRequest(APIException):
    status = 400


class NotFound(APIException):
    status = 404
