_ERRORS = {
    100: 'Invalid Attribute',
    101: 'Element Not Found',
}


class Error:
    code = None
    detail = None
    source = None
    title = None

    def __init__(self, detail=None, code=None, source=None):
        if code is not None:
            self.code = code

        if detail is not None:
            self.detail = detail

        if source is not None:
            self.source = source

        self.title = _ERRORS.get(self.code)


class InvalidAttribute(Error):
    code = 100


class ElementNotFound(Error):
    code = 101
