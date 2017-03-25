from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app import db
from app.models import BaseModel


class Department(BaseModel):
    __tablename__ = 'departments'

    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    vacancies = relationship('Vacancy', back_populates='department', cascade='all, delete-orphan')
    head_id = db.Column(UUID, db.ForeignKey('employees.id'))
    head = relationship('Employee', back_populates='department')
