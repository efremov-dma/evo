import uuid as uuid

from sqlalchemy.dialects.postgresql import UUID

from app import db
from app.errors.exceptions import NotFound


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(UUID, primary_key=True, default=lambda: uuid.uuid4().hex)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    @classmethod
    def get(cls, id: str):
        return cls.query.get(id)

    @classmethod
    def get_by(cls, **kw):
        return cls.query.filter_by(**kw).first()

    @classmethod
    def get_or_404(cls, id: str):
        model = cls.get(id)
        if model is None:
            raise NotFound()
        return model

    @classmethod
    def filter_by(cls, **kw):
        return cls.query.filter_by(**kw)

    @classmethod
    def create(cls, **kw):
        model = cls(**kw)
        db.session.add(model)
        return model

    def update(self, data: dict):
        for key, value in data.items():
            setattr(self, key, value)

    def save(self):
        db.session.add(self)

    def delete(self):
        db.session.delete(self)
