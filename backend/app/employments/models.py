from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app import db
from app.models import BaseModel


class Employment(BaseModel):
    __tablename__ = 'employments'

    department_id = db.Column(UUID, db.ForeignKey('departments.id'), nullable=False)
    department = relationship('Department', back_populates='employments')
    employee_id = db.Column(UUID, db.ForeignKey('employees.id'), nullable=False)
    employee = relationship('Employee', foreign_keys=employee_id, back_populates='employments')
    position_id = db.Column(UUID, db.ForeignKey('positions.id'))
    position = relationship('Position')
    start_date = db.Column(db.Date(), nullable=False)
    end_date = db.Column(db.Date(), nullable=True)
