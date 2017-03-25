from app import db
from app.models import BaseModel


class Position(BaseModel):
    __tablename__ = 'positions'

    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
