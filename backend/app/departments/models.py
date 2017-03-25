from app import db
from app.models import BaseModel


class Department(BaseModel):
    __tablename__ = 'departments'

    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
