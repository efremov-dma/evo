from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app import db
from app.models import BaseModel


class Vacancy(BaseModel):
    __tablename__ = 'vacancies'

    position_id = db.Column(UUID, db.ForeignKey('positions.id'))
    position = relationship('Position')
    opening_date = db.Column(db.DateTime(timezone=True), nullable=False)
    closing_date = db.Column(db.DateTime(timezone=True), nullable=True)
    department_id = db.Column(UUID, db.ForeignKey('departments.id'), nullable=False)
    department = relationship('Department', back_populates='vacancies')
